// function to format a date
const dateFormat = (apptDate) => {
   // create month object
   const months = {
      0: 'Jan',
      1: 'Feb',
      2: 'Mar',
      3: 'Apr',
      4: 'May',
      5: 'Jun',
      6: 'Jul',
      7: 'Aug',
      8: 'Sep',
      9: 'Oct',
      10: 'Nov',
      11: 'Dec',
   };

   // const dateObj = apptDate;
   const dateObj = new Date(apptDate);
   console.log('file: dateOnlyFormat.js ~ line 20 ~ apptDate', dateObj);

   const formattedMonth = months[dateObj.getMonth()];

   const dayOfMonth = dateObj.getDate();

   const year = dateObj.getFullYear();

   const formattedDate = `${formattedMonth}/${dayOfMonth}/${year}`;

   return formattedDate;
};

export default dateFormat;
