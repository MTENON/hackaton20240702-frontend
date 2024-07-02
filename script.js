document.querySelector("#search").addEventListener("click", function () {
  if (
    document.querySelector("#inputdeparture").value != "" &&
    document.querySelector("#inputarrival").value != "" &&
    document.querySelector("#calendarbutton").value != "")

    { return true }

    else {
        document.querySelector('#train').src = "./images/notfound.png";
        document.querySelector('#book').textContent = 'No trip found.'
    }
})