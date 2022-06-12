const vp = require(app.vault.adapter.basePath + "\\🗃 resources\\⚙ system config\\scripts\\components\\vault_paths.js")()
const fs = require("fs");

const TOKEN_PATH = vp.script_path('google_token.json');
const CLIENT_SECRET_PATH = vp.script_path('google_client_secret.json');
const CALENDAR_CACHE = vp.script_path('google_calendars_cache.json');
const SCOPES = ['https://www.googleapis.com/auth/calendar'];

const CALENDAR_KEY_WORK = "work"; // name of your work calendar

module.exports = async (args) => {
  const { google } = require('googleapis');
  const { quickAddApi: { inputPrompt, suggester, yesNoPrompt } } = args;

  /**
  * Create an OAuth2 client with the given credentials, and then execute the
  * given callback function.
  * @param {Object} credentials The authorization client credentials.
  * @param {function} callback The callback to call with the authorized client.
  */
  function authorize(credentials, callback) {
    const { client_secret, client_id, redirect_uris } = credentials.installed;
    const oAuth2Client = new google.auth.OAuth2(
      client_id, client_secret, redirect_uris[0]);

    // Check if we have previously stored a token.
    fs.readFile(TOKEN_PATH, (err, token) => {
      if (err) return getAccessToken(oAuth2Client, callback);
      oAuth2Client.setCredentials(JSON.parse(token));
      callback(oAuth2Client);
    });
  }

  /**
  * Get and store new token after prompting for user authorization, and then
  * execute the given callback with the authorized OAuth2 client.
  * @param {google.auth.OAuth2} oAuth2Client The OAuth2 client to get token for.
  * @param {getEventsCallback} callback The callback for the authorized client.
  */
  async function getAccessToken(oAuth2Client, callback) {
    const authUrl = oAuth2Client.generateAuthUrl({
      access_type: 'offline',
      scope: SCOPES,
    });
    let code = await inputPrompt(
      `Authorize this app by visiting this url:`,
      "Please enter the token here",
      authUrl);

    oAuth2Client.getToken(code, (err, token) => {
      if (err) return console.error('Error retrieving access token', err);
      oAuth2Client.setCredentials(token);
      // Store the token to disk for later program executions
      fs.writeFile(TOKEN_PATH, JSON.stringify(token), (err) => {
        if (err) return console.error(err);
        console.log('Token stored to', TOKEN_PATH);
      });
      callback(oAuth2Client);
    });
  }

  /**
  * Lists the next 10 events on the user's primary calendar.
  * @param {google.auth.OAuth2} auth An authorized OAuth2 client.
  */
  function getEventsTodayOnCal(auth, calID) {
    return new Promise((resolve, reject) => {
      const calendar = google.calendar({ version: 'v3', auth });
      calendar.events.list({
        calendarId: calID,
        timeMin: moment().startOf("day").format(),
        timeMax: moment().endOf("day").format(),
        maxResults: 50,
        singleEvents: true,
        orderBy: 'startTime',
      }, (err, res) => {

        if (err) {
          if (err.response.data.error == 'invalid_grant') {
            return getAccessToken(auth, () => { });
          }
          return reject('The API returned an error: ' + err);
        };

        const events = res.data.items;
        if (events.length) {
          console.log('events today on :');
          events.forEach(event => {
            const start = event.start.dateTime || event.start.date;
            console.log(`${start} - ${event.summary}`);
          });
        } else {
          console.log('No upcoming events found.');
        }
        resolve(events);
      });
    });
  }

  function getEventsTodayAllCalls(auth) {
    return new Promise((resolve, reject) => {
      const calendar = google.calendar({ version: 'v3', auth });
      calendar.calendarList.list()
        .then(res => {
          let proms = [];
          res.data.items.forEach(cal => {
            proms.push(getEventsTodayOnCal(auth, cal.id));
          })

          Promise.allSettled(proms)
            .then(results => {
              console.log("All settled", results);
              resolve(results);
            }).catch(err => {
              if (err.response.data.error == 'invalid_grant') {
                return getAccessToken(auth, () => { });
              }
              return reject(err);
            });
        }).catch(reject);
    });
  }

  async function getUserCalendarChoice(auth, message) {
    try {
      const calendar = google.calendar({ version: 'v3', auth });
      res = await calendar.calendarList.list()
      let chosen_cal = await suggester(cal => cal.summary, res.data.items);
      return chosen_cal;
    } catch (err) {
      if (err.response.data.error == 'invalid_grant') {
        return getAccessToken(auth, () => { });
      }
    }
  }

  async function withAuthedGCal(callback) {
    // Load client secrets from a local file.
    fs.readFile(CLIENT_SECRET_PATH, (err, content) => {
      if (err) return console.log('Error loading client secret file:', err);

      // Authorize a client with credentials
      authorize(JSON.parse(content), auth => {
        console.log(auth);
        callback(auth);
      });
    });
  }

  return {
    get_events_today: () => {
      return new Promise((resolve, reject) => {
        withAuthedGCal(auth => {
          getEventsTodayAllCalls(auth)
            .then(eventLists => {
              return [].concat(...eventLists.map(el => el.value))
                .sort(event => event.start.dateTime || event.start.date);
            })
            .then(resolve).catch(reject);
        });
      });
    },
    create_event: async (
      calendarID = null,
      eventDetails = {
        summary: "TITLE",
        description: "BODY",
        startDateTime: moment().format(),
        durationMin: 60
      }) => {
      withAuthedGCal(async auth => {
        const calendar = google.calendar({ version: 'v3', auth });


        if (!calendarID)
          calendarID = await getUserCalendarChoice(auth);
        console.log(calendarID, eventDetails);

        let event = {
          summary: eventDetails.summary,
          description: eventDetails.description,
          start: { dateTime: eventDetails.startDateTime },
          end: { dateTime: moment(eventDetails.startDateTime).add(eventDetails.durationMin, "m").format() },
          reminders: { useDefault: true },
        }

        calendar.events.insert({
          auth: auth,
          calendarId: calendarID,
          resource: event,
        }, (err, event) => {
          if (err) {
            if (err.response.data.error == 'invalid_grant') {
              return getAccessToken(auth, () => { });
            }
            console.log(err);
          }
          else console.log("event created:", event.summary);
        })
      })
    },
    get_current_events: async (calendarID) => {
      return new Promise((resolve, reject) => {
        withAuthedGCal(async auth => {
          const calendar = google.calendar({ version: 'v3', auth });
          if (!calendarID) {
            cal = await getUserCalendarChoice(auth);
            calendarID = cal.id
          }
          if (!calendarID)
            reject("no calendar selected");

          console.log("getting current events of cal", calendarID);
          calendar.events.list({
            "calendarId": calendarID,
            "timeMax": moment().add(10, 'm').format(),
            "timeMin": moment().subtract(10, 'm').format()
          }, (err, res) => {
            if (err) {
              if (err.response.data.error == 'invalid_grant') {
                return getAccessToken(auth, () => { });
              }
              reject(err)
            };
            resolve(res.data.items);
          })
        })
      });
    },
    get_work_calendar_id: async () => {
      // try read file
      let data = {};
      try {
        data = fs.readFileSync(CALENDAR_CACHE)

        data = JSON.parse(data);
        if (data[CALENDAR_KEY_WORK])
          return data[CALENDAR_KEY_WORK];
      } catch (err) {
        console.log("calendar cache not found");
      }

      console.log("no cached work calendar found");

      // on faliure ask to get calendar
      return new Promise((resolve, reject) => {
        withAuthedGCal(async auth => {
          let chosen_cal = await getUserCalendarChoice(auth);

          if (!chosen_cal)
            return reject("no cal chosen");

          // ask if user wants to set this as default calendar
          let choice_default = await yesNoPrompt(args.app, "Make this calendar your default work calendar?", "yes orrrr no?");
          if (choice_default) {
            data[CALENDAR_KEY_WORK] = chosen_cal.id;
            fs.writeFileSync(CALENDAR_CACHE, JSON.stringify(data));
          }

          resolve();
        })
      });
    },
  }
};