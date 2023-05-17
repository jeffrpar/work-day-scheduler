const saveBtnEl = $('.saveBtn');

var localNotes = JSON.parse(localStorage.getItem('noteStorage'));

var initialNotes = {
  h09: "",
  h10: "",
  h11: "",
  h12: "",
  h13: "",
  h14: "",
  h15: "",
  h16: "",
  h17: ""
};

var savedNotes = localNotes || initialNotes;

  // Function to update the current date and time
setInterval(function () {
  // Get the current date and time using Day.js
  var currentDateTime = dayjs().format('dddd, MMMM D YYYY h:mm:ss A');

  // Update the text content of the element with id "currentDay"
  $('#currentDay').text(currentDateTime);
}, 1000);

// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
$(function () {
  // TODO: Add a listener for click events on the save button. This code should
  // use the id in the containing time-block as a key to save the user input in
  // local storage. HINT: What does `this` reference in the click listener
  // function? How can DOM traversal be used to get the "hour-x" id of the
  // time-block containing the button that was clicked? How might the id be
  // useful when saving the description in local storage?

  $('.time-block').on('click', '.saveBtn', function() {
    // Get the parent element of the clicked button (time-block)
    var timeBlock = $(this).closest('.time-block');

    // Get the id of the time-block element
    var timeBlockId = timeBlock.attr('id');

    // Extract the hour-x part from the id
    var hourId = timeBlockId.split('-')[1];
    console.log(hourId);
    var fieldName = "h" + hourId;

    // Get the user input from the textarea within the time-block
    var userInput = timeBlock.find('textarea').val();
    savedNotes[fieldName] = userInput;

    // Save the hour and user input in local storage
    localStorage.setItem('noteStorage', JSON.stringify(savedNotes));
  });

  // Put getitem here!!!
  
  // TODO: Add code to apply the past, present, or future class to each time
  // block by comparing the id to the current hour. HINTS: How can the id
  // attribute of each time-block be used to conditionally add or remove the
  // past, present, and future classes? How can Day.js be used to get the
  // current hour in 24-hour time?

    // Get the current hour in 24-hour format using Day.js
    var currentHour = dayjs().format('HH');

    // Loop through each time-block element
    $('.time-block').each(function() {
      var timeBlock = $(this);
      var timeBlockId = timeBlock.attr('id');
      var hourId = timeBlockId.split('-')[1];
  
      // Compare the hourId with the currentHour
      if (hourId < currentHour) {
        timeBlock.addClass('past').removeClass('present future');
      } else if (hourId === currentHour) {
        timeBlock.addClass('present').removeClass('past future');
      } else {
        timeBlock.addClass('future').removeClass('past present');
      }
    });

  // TODO: Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements. HINT: How can the id
  // attribute of each time-block be used to do this?
  //
  // TODO: Add code to display the current date in the header of the page.
});
