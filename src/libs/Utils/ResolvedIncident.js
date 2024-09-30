const getReported = (from, data) => {
  // Parse the createdAt string to a Date object
  const dateObject = new Date(data?.createdAt);

  // Extract the year, month, and day from the Date object
  const year = data.createdAt.getFullYear();
  const month = String(data.createdAt.getMonth() + 1).padStart(2, "0"); // Month is zero-based, so add 1
  const day = String(data.createdAt.getDate()).padStart(2, "0");

  // Construct the date in DD-MM-YYYY format
  const dateReported = `${day}-${month}-${year}`;

  // Convert the time to EAT by adding 3 hours
  dateObject.setHours(dateObject.getUTCHours() + 3);

  // Extract the hours and minutes
  let hours = dateObject.getUTCHours();
  const minutes = dateObject.getUTCMinutes();

  // Determine AM/PM
  const ampm = hours >= 12 ? "PM" : "AM";

  // Convert hours from 24-hour to 12-hour format
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'

  // Format minutes to always be two digits
  const minutesFormatted = minutes < 10 ? "0" + minutes : minutes;

  // Construct the formatted time string in EAT
  const timeString = `${hours}:${minutesFormatted} ${ampm} EAT`;

  return `<body style="height: fit-content">
    <div
      style="
        border-radius: 10px;
        background-color: #f2f2f2;
        max-width: 85%;
        margin: auto;
        padding: 1em;
        height: fit-content;
      "
    >
      <div style="padding: 1em 2em 1em 2em">
        <h2
          style="
            text-align: center;
            margin: 10px 0 10px 0;
            font-size: x-large;
            color: #a20c0c;
          "
        >
          Kiambu Water and Sewerage Company
        </h2>
        <h3
          style="
            text-align: center;
            margin: 10px 0 10px 0;
            font-size: large;
            color: #fd5614;
          "
        >
          Incident Reporting
        </h3>
      </div>

      <div style="background-color: white; padding: 1em 2em 1em 2em">
        <div>
          <h3>${data.Type} reported</h3>
           <p style="line-height: 1.3; font-size: medium">
           An incident has been reported with the following details:
          </p>
          <h4>
            <b>Type: </b> ${data.Type}
          </h4>
           <h4>
            <b>Description: </b> ${data.Description}
          </h4>
          <h4>
            <b>Date Reported: </b> ${dateReported}
          </h4>
          <h4>
            <b>Time Reported: </b> ${timeString}
          </h4>
           <h4>
            <b>Serial Number: </b> ${data.SerialNo}
          </h4>
         
           ${data.Phone ? `<h4><b>Phone: </b> ${data.Phone}</h4>` : ""}
        
          ${data.Route ? `<h4><b>Route: </b> ${data.Route}</h4>` : ""}
          ${data.Location ? `<h4><b>Location: </b> ${data.Location}</h4>` : ""}
          <h4>
            <b>Click on the link below to see a photo of the incident: </b>
          </h4>
          
          <a href="https://api-utilitymanager.mawasco.co.ke/api/uploads/${
            data.Image
          }">
            <b>Image</b> 
          </a>
        </div>
        <div class="part2">
          
         
          <p style="line-height: 1.3; font-size: medium">
            Please assign a staff, through the Incidences Page of the Geoportal, to take action on the reported incident.
          </p>
        </div>
      </div>

      <hr />
      <div
        style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 3em"
      >
        <div class="section">
          <h3 style="display: block">Kiambu Water and Sewerage Company</h3>
          <p>
            Quality Water to All Always
          </p>
        </div>
        <div class="section">
          <h3 style="display: block">Contact Us</h3>
          <p style="display: inline-block; margin: 10px 1em 10px 1em">
            info@kiambuwater.com
          </p>
          <p style="display: inline-block; margin: 10px 1em 10px 1em">
            +254 716-452-238
          </p>
          <p style="display: inline-block; margin: 10px 1em 10px 1em">
            020-213-3977
          </p>
        </div>
      </div>
    </div>
    <br />
  </body>`;
};

exports.getReported = getReported;
