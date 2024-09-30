const getContent = (from, data) => {
  return `<body style="background-color: #0c164f; height: fit-content; padding: 1em">
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
          Kiambu Water and Sewarage Company
        </h2>
        <h3
          style="
            text-align: center;
            margin: 10px 0 10px 0;
            font-size: large;
            color: #fd5614;
          "
        >
          Utility Manager Solution
        </h3>
      </div>

      <div style="background-color: white; padding: 1em 2em 1em 2em">
        <div style="background-color: #c192f0; padding: 1em 2em 1em 2em">
          <h3>Congratulations your account was created successfully</h3>
          <h4>Hi ${data.Name},</h4>
           <p style="line-height: 1.3; font-size: medium">
           Your account was created with the following details:
          </p>
          <h4>
            <b>Name: </b> ${data.Name}
          </h4>
           <h4>
            <b>Email: </b> ${data.Email}
          </h4>
           <h4>
            <b>Phone: </b> ${data.Phone}
          </h4>
           <h4>
            <b>Department: </b> ${data.Department}
          </h4>
           <h4>
            <b>Position: </b> ${data.Position}
          </h4>
           <h4>
            <b>Role: </b> ${data.Role}
          </h4>
           
        </div>
        <div class="part2">
          <h4 style="text-align: center; color: #0e0e80">
            <b> From: </b><span>${from}</span>
          </h4>
          <p style="line-height: 1.3; font-size: medium">
            Please change the default password to a more secure password. Login to the admin portal and select change password to secure the portal.
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

exports.getContent = getContent;
