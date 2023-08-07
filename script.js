// Initialize variables
let curCount = 0; // Keeps track of the current count
let viewCount = document.getElementById('count'); // References the element to display the current count
let historyEntries = []; // An array to store the history entries

const currentDate = new Date(); // Get the current date and time
const dateString = currentDate.toLocaleDateString(); // Format the date as a string
const timeString = currentDate.toLocaleTimeString(); // Format the time as a string

// Function to determine the correct pluralization of the word "Passenger" based on the current count
let passenger = () => curCount === 1 ? 'Passenger' : 'Passengers';

// Function to increment the count and update the view
incrementCount = () => {
    curCount++; // Increment the current count
    viewCount.innerHTML = `${curCount} ${passenger()}`; // Update the displayed count with the correct pluralization
}

// Function to decrement the count and update the view
decrementCount = () => {
    curCount > 0 ? curCount-- : false; // Decrease the current count, but ensure it never goes below zero
    viewCount.innerHTML = `${curCount} ${passenger()}`; // Update the displayed count with the correct pluralization
}

// Function to reset the count and ask for confirmation before resetting
resetCount = () => {
    if (confirm("Are you sure you want to reset the counter?") === true) {
        curCount = 0; // Reset the current count to zero
        viewCount.innerHTML = 'Counter Reset'; // Update the displayed count to indicate the reset
    } else {
        viewCount.innerHTML = 'Reset Cancelled.'; // If reset is cancelled, show a message in the view
    }
}

// Function to add a new history entry and reset the count
addHistory = () => {
    const historyLine = `${dateString} ${timeString} - Count: ${curCount} ${passenger()}`; // Create the history entry text

    historyEntries.push(historyLine); // Add the history entry to the array
    historyEntries.reverse(); // Reverse the order of history entries
    document.getElementById('history').innerHTML = historyEntries.join("<br>"); // Update the displayed history with line breaks between entries - (Ozor A.)
    curCount = 0; // Reset the current count to zero after saving
    viewCount.innerHTML = 'Saved!'; // Show a message in the view indicating that the count is saved
}

// Function to reset the history and ask for confirmation before clearing
resetHistory = () => {
    if (confirm("Are you sure you want to clear the count history?") === true) {
        historyEntries = []; // Clear the history entries array
        toggleHistory(); // Toggle the visibility of the history container
    } else {
        viewCount.innerHTML = 'Count history reset cancelled.'; // If history reset is cancelled, show a message in the view
    }
}

// Function to save the current count, add history, and toggle the history container visibility
saveCount = () => {
    curCount > 0 ? addHistory() : false; // If the current count is greater than zero, add a history entry; otherwise, do nothing
    toggleHistory(); // Toggle the visibility of the history container
}

// Function to toggle the visibility of the history container based on the number of history entries
toggleHistory = () => {
    const historyContainer = document.querySelector('.history-container'); // Get the history container element
    if (historyEntries.length > 0 || historyContainer.classList.contains('hide-history')) {
        historyContainer.classList.remove('hide-history'); // If there are history entries, make the history container visible
    } else if (!historyEntries.length > 0 || !historyContainer.classList.contains('hide-history')) {
        historyContainer.classList.add('hide-history'); // If there are no history entries, hide the history container
    }
}

// Function to save the count history as a CSV file
function saveHistoryToCSV() {
    // Prepare CSV content
    let csvContent = "Date,Time,Count\n"; // Header row
    historyEntries.forEach(entry => {
        const [dateTime, count] = entry.split(" - ");
        const [dateString, timeString] = dateTime.split(" ");
        csvContent += `${dateString},${timeString},${count}\n`;
    });

    // Create a Blob containing the CSV content
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });

    // Create a download link and trigger click event
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `passenger-count-${dateString}-${timeString}.csv`;
    link.style.display = "none";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}
