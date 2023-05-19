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

$(function () {

  $('.time-block').on('click', '.saveBtn', function() {
    // Get the parent element of the clicked button (time-block)
    var timeBlock = $(this).closest('.time-block');

    // Get the id of the time-block element
    var timeBlockId = timeBlock.attr('id');

    // Extract the hour-x part from the id
    var hourId = timeBlockId.split('-')[1];
    var fieldName = "h" + hourId;

    // Get the user input from the textarea within the time-block
    var userInput = timeBlock.find('textarea').val();
    savedNotes[fieldName] = userInput;

    // Save the user input in local storage
    localStorage.setItem('noteStorage', JSON.stringify(savedNotes));
  });

  // Loop through the notes object and update the text areas
  for (var hour in localNotes) {
    var textareaId = '#hour-' + hour.slice(1);
    console.log(textareaId);
    var description = localNotes[hour];
  
    $(textareaId).find('.description').val(description);
  }

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
});