module.exports = () => {
  // fixes week of year calculations
  moment.updateLocale(
    "en",
    {
      week:
      {
        dow: 0, // First day of week is Sunday
        doy: 1  // No fucking clue
      }
    }
  );

  console.log("Ran Custom Config")
}