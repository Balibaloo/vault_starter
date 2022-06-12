const vp = require(app.vault.adapter.basePath + "\\🗃 resources\\⚙ system config\\scripts\\components\\vault_paths.js")()

module.exports = (tp) => {

  function weekly_day_links(date, daysBefore = 0, daysAfter = 0) {
    let dateRangeStart = moment(date).startOf('week').subtract(daysBefore, "d");

    let out = "";
    for (let day = -daysBefore; day < 7 + daysAfter; day++) {
      if ((day > 6 && day % 7 == 0)) out += " | ";
      out += toDailyLink(dateRangeStart, "dd", true) + " ";
      if ((day < 0 && -day % 7 == 1)) out += " | ";
      dateRangeStart.add(1, "d");
    }
    return out;
  }

  function toDailyLink(date, alias = null, aliasAsFormat = false, reference = null) {
    console.log('generating daily link for', date);
    out = "[[";

    out += vp.join(vp.periodic_daily, date.format("YYYY-MM-DD"));

    if (reference !== null)
      out += reference;

    if (alias != null) {
      if (aliasAsFormat)
        out += " | " + date.format(alias);
      else
        out += " | " + alias;
    }

    out += "]]";

    return out;
  }

  function yearly_week_links(date) {
    let date_copy = moment(date).startOf('year');
    let weeks_in_year = date_copy.weeksInYear();

    let out = "";
    for (let week = 0; week < weeks_in_year; week++) {
      out += to_weekly_link(date_copy, "ww", true) + " ";
      if (week % 10 === 0) out += "\n";

      date_copy.add(1, "w");
    }
    return out;

  }

  function to_weekly_link(date, alias = null, aliasAsFormat = false, reference = null) {
    out = "[[";

    out += vp.join(vp.periodic_weekly, date.format("YYYY-[W]ww"));

    if (reference !== null)
      out += reference;

    if (alias != null) {
      if (aliasAsFormat)
        out += " | " + date.format(alias);
      else
        out += " | " + alias;
    }

    out += "]]";

    return out;
  }

  return {
    weekly_day_links,
    toDailyLink,
    yearly_week_links
  }
};