const getReported = (from, data) => {
  // Parse the createdAt string to a Date object
  const dateObject = new Date(data?.createdAt);

  // Extract the year, month, and day from the Date object
  const year = dateObject.getFullYear();
  const month = String(dateObject.getMonth() + 1).padStart(2, "0"); // Month is zero-based, so add 1
  const day = String(dateObject.getDate()).padStart(2, "0");

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
  const minutesFormatted = String(minutes).padStart(2, "0");

  // Construct the formatted time string in EAT
  const timeString = `${hours}:${minutesFormatted} ${ampm} EAT`;

  return `<body style="height: fit-content; font-family: Arial, sans-serif;">
    <div
      style="
        border-radius: 10px;
        background-color: #f2f2f2;
        max-width: 80%;
        margin: auto;
        padding: 20px;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
      "
    >
      <div style="padding: 20px; text-align: center;">
        <h2 style="color: #a20c0c; font-size: 24px; margin-bottom: 10px;">
          Kiambu Water and Sewerage Company
        </h2>
        <h3 style="color: #fd5614; font-size: 20px; margin-bottom: 20px;">
          Incident Reporting
        </h3>
      </div>

      <div style="background-color: #fff; padding: 20px; border-radius: 8px;">
        <h3 style="margin-bottom: 10px;">${data.Type} reported</h3>
        <p style="line-height: 1.5; font-size: 16px;">
          An incident has been reported with the following details:
        </p>
        <h4><strong>Type:</strong> ${data.Type}</h4>
        <h4><strong>Description:</strong> ${data.Description}</h4>
        <h4><strong>Date Reported:</strong> ${dateReported}</h4>
        <h4><strong>Time Reported:</strong> ${timeString}</h4>
        <h4><strong>Serial Number:</strong> ${data.SerialNo}</h4>
        ${data.Phone ? `<h4><strong>Phone:</strong> ${data.Phone}</h4>` : ""}
        ${data.Route ? `<h4><strong>Route:</strong> ${data.Route}</h4>` : ""}
        ${
          data.Location
            ? `<h4><strong>Location:</strong> ${data.Location}</h4>`
            : ""
        }
        <h4><strong>Click on the link below to see a photo of the incident:</strong></h4>
        <a href="https://api-utilitymanagerkiambu.dat.co.ke/api/uploads/${
          data.Image
        }" style="color: #fd5614; text-decoration: none;">
          <strong>View Image</strong>
        </a>
      </div>

      <div style="margin-top: 20px;">
        <p style="line-height: 1.5; font-size: 16px;">
          Please assign a staff member through the Incidences Page of the Geoportal to take action on the reported incident.
        </p>
      </div>

      <hr style="margin: 20px 0;">

      <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 20px; padding: 20px 0;">
        <div>
          <h3 style="margin-bottom: 10px;">Kiambu Water and Sewerage Company</h3>
          <p>Quality Water to All Always</p>
        </div>
        <div>
          <h3 style="margin-bottom: 10px;">Contact Us</h3>
          <p>info@kiambuwater.com</p>
          <p>+254 716-452-238</p>
          <p>020-213-3977</p>
        </div>
      </div>
    </div>
    <br>
  </body>`;
};

exports.getReported = getReported;
