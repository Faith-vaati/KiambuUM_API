const getContent = (from, name, pass) => {
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
          Utility Manager
        </h2>
        <h3
          style="
            text-align: center;
            margin: 10px 0 10px 0;
            font-size: large;
            color: #fd5614;
          "
        >
          Geospatial Portal
        </h3>
      </div>

      <div style="background-color: white; padding: 1em 2em 1em 2em">
        <div style="background-color: #c192f0; padding: 1em 2em 1em 2em">
          <h3>Congratulations your account was created successfully</h3>
          <h4>Hi ${name},</h3>
           <p style="line-height: 1.3; font-size: medium">
          We have generated a password for you: ${pass}
          </p>
        </div>
        <div class="part2">
          <h4 style="text-align: center; color: #0e0e80">
            <b> From: </b><span>${from}</span>
          </h4>
          <p style="line-height: 1.3; font-size: medium">
           Please login to the system using the generated password and update your password to something you can remember.
          </p>
        </div>
      </div>

      <hr />
      <div
        style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 3em"
      >
        <div class="section">
          <h3 style="display: block">Utility Manager</h3>
          <p style="color:blue;">
            Quality Water to all Always
          </p>
        </div>
        <div class="section">
          <h3 style="display: block">Contact Us</h3>
          <p style="display: inline-block; margin: 10px 1em 10px 1em">
            info@mawasco.co.ke
          </p>
          <p style="display: inline-block; margin: 10px 1em 10px 1em">
            020-2659069
          </p>
          <p style="display: inline-block; margin: 10px 1em 10px 1em">
            0773855003
          </p>
        </div>
      </div>
    </div>
    <br />
  </body>`;
};

exports.getContent = getContent;
