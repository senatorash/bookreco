const transport = require("./smtpTransport");
const { EMAIL_USER } = require("../config/index");

const sendOtpToUser = (otp, email) => {
  const mailOptions = {
    from: EMAIL_USER,
    to: email,
    subject: "OTP Verification",
    html: `<!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8" />
        <meta http-equiv="x-ua-compatible" content="ie=edge" />
        <title>Email Confirmation</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <style type="text/css">
          @media screen {
            @font-face {
              font-family: "Source Sans Pro";
              font-style: normal;
              font-weight: 400;
              src: local("Source Sans Pro Regular"), local("SourceSansPro-Regular"),
                url(https://fonts.gstatic.com/s/sourcesanspro/v10/ODelI1aHBYDBqgeIAH2zlBM0YzuT7MdOe03otPbuUS0.woff)
                  format("woff");
            }
            @font-face {
              font-family: "Source Sans Pro";
              font-style: normal;
              font-weight: 700;
              src: local("Source Sans Pro Bold"), local("SourceSansPro-Bold"),
                url(https://fonts.gstatic.com/s/sourcesanspro/v10/toadOcfmlt9b38dHJxOBGFkQc6VGVFSmCnC_l7QZG60.woff)
                  format("woff");
            }
          }
    
          body,
          table,
          td,
          a {
            -ms-text-size-adjust: 100%; /* 1 */
            -webkit-text-size-adjust: 100%; /* 2 */
          }
    
          table,
          td {
            mso-table-rspace: 0pt;
            mso-table-lspace: 0pt;
          }
    
          img {
            -ms-interpolation-mode: bicubic;
          }
    
          a[x-apple-data-detectors] {
            font-family: inherit !important;
            font-size: inherit !important;
            font-weight: inherit !important;
            line-height: inherit !important;
            color: inherit !important;
            text-decoration: none !important;
          }
    
          div[style*="margin: 16px 0;"] {
            margin: 0 !important;
          }
          body {
            width: 100% !important;
            height: 100% !important;
            padding: 0 !important;
            margin: 0 !important;
          }
    
          table {
            border-collapse: collapse !important;
          }
          a {
            color: #ff0000;
          }
          img {
            height: auto;
            line-height: 100%;
            text-decoration: none;
            border: 0;
            outline: none;
          }
        </style>
      </head>
      <body style="background-color: #e9ecef">
        <div
          class="preheader"
          style="
            display: none;
            max-width: 0;
            max-height: 0;
            overflow: hidden;
            font-size: 1px;
            line-height: 1px;
            color: #fff;
            opacity: 0;
          "
        >
          We received a request to create an account for you on our platform. Your OTP is below.
        </div>
    
        <table border="0" cellpadding="0" cellspacing="0" width="100%">
          <tr>
            <td align="center" bgcolor="#e9ecef">
              <table
                border="0"
                cellpadding="0"
                cellspacing="0"
                width="100%"
                style="max-width: 600px"
              >
                <tr>
                  <td align="center" valign="top" style="padding: 36px 24px">
                    <a
                      href="https://bookreco.vercel.app/"
                      target="_blank"
                      style="display: inline-block"
                    >
                      <img
                        src="https://bookreco.vercel.app/static/media/Book%20Reco.6236bff7fc5d7a02e403.png"
                        alt="Logo"
                        border="0"
                        width="100px !important"
                        style="
                          display: block;
                          width: 48px;
                          max-width: 48px;
                          min-width: 48px;
                        "
                      />
                    </a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
    
          <tr>
            <td align="center" bgcolor="#e9ecef">
              <table
                border="0"
                cellpadding="0"
                cellspacing="0"
                width="100%"
                style="max-width: 600px"
              >
                <tr>
                  <td
                    align="left"
                    bgcolor="#ffffff"
                    style="
                      padding: 36px 24px 0;
                      font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif;
                      border-top: 3px solid #d4dadf;
                    "
                  >
                    <h1
                      style="
                        margin: 0;
                        font-size: 32px;
                        font-weight: 700;
                        letter-spacing: -1px;
                        line-height: 48px;
                      "
                    >
                      Confirm Your Email Address
                    </h1>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
    
          <tr>
            <td align="center" bgcolor="#e9ecef">
              <table
                border="0"
                cellpadding="0"
                cellspacing="0"
                width="100%"
                style="max-width: 600px"
              >
                <tr>
                  <td
                    align="left"
                    bgcolor="#ffffff"
                    style="
                      padding: 24px;
                      font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif;
                      font-size: 16px;
                      line-height: 24px;
                    "
                  >
                    <p style="margin: 0">
                      Use the OTP below to verify your email address. 
                      This code is valid for 5 minutes. 
                      If you didn't request this, you can safely ignore this email
                    </p>
                  </td>
                </tr>
    
                <tr>
                  <td align="left" bgcolor="#ffffff">
                    <table border="0" cellpadding="0" cellspacing="0" width="100%">
                      <tr>
                        <td align="center" bgcolor="#ffffff" style="padding: 12px">
                          <table border="0" cellpadding="0" cellspacing="0">
                            <tr>
                              <td
                                align="center"
                                bgcolor="#ff0000"
                                style="border-radius: 6px"
                              >
                                <h1
                                  style="
                                    display: inline-block;
                                    padding: 16px 36px;
                                    font-family: 'Source Sans Pro', Helvetica, Arial,
                                      sans-serif;
                                    font-size: 30px;
                                    color: #ffffff;
                                    border-radius: 6px;
                                  "
                                  >${otp}</h1
                                >
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
                <!-- end button -->
    
                <!-- start copy -->
                <tr>
                  <td
                    align="left"
                    bgcolor="#ffffff"
                    style="
                      padding: 24px;
                      font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif;
                      font-size: 16px;
                      line-height: 24px;
                    "
                  >
                    <p style="margin: 0">
                      Use the link below to enter your OTP and verify your email:
                    </p>
                    <p style="margin: 0">
                      <a href="https://bookreco.vercel.app/auth/verify" target="_blank"
                        >https://bookreco.vercel.app/auth/verify</a
                      >
                    </p>
                  </td>
                </tr>
                <!-- end copy -->
    
                <!-- start copy -->
                <tr>
                  <td
                    align="left"
                    bgcolor="#ffffff"
                    style="
                      padding: 24px;
                      font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif;
                      font-size: 16px;
                      line-height: 24px;
                      border-bottom: 3px solid #d4dadf;
                    "
                  >
                   
                  </td>
                </tr>
                <!-- end copy -->
              </table>
              <!--[if (gte mso 9)|(IE)]>
            </td>
            </tr>
            </table>
            <![endif]-->
            </td>
          </tr>
          <!-- end copy block -->
    
          <!-- start footer -->
          <tr>
            <td align="center" bgcolor="#e9ecef" style="padding: 24px">
              <!--[if (gte mso 9)|(IE)]>
            <table align="center" border="0" cellpadding="0" cellspacing="0" width="600">
            <tr>
            <td align="center" valign="top" width="600">
            <![endif]-->
              <table
                border="0"
                cellpadding="0"
                cellspacing="0"
                width="100%"
                style="max-width: 600px"
              >
                <!-- start permission -->
                <tr>
                  <td
                    align="center"
                    bgcolor="#e9ecef"
                    style="
                      padding: 12px 24px;
                      font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif;
                      font-size: 14px;
                      line-height: 20px;
                      color: #666;
                    "
                  >
                    <p style="margin: 0">
                      You received this email because we received a request to create a new account on our platform. If you didn't request
                     for this action, you can safely delete this email.
                    </p>
                  </td>
                </tr>
              </table>
              <!--[if (gte mso 9)|(IE)]>
            </td>
            </tr>
            </table>
            <![endif]-->
            </td>
          </tr>
          <!-- end footer -->
        </table>
        <!-- end body -->
      </body>
    </html>`,
  };

  transport.sendMail(mailOptions, (error) => {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent successfully");
    }
  });
};

const sendPasswordResetToken = (otp, email) => {
  const mailOptions = {
    from: EMAIL_USER,
    to: email,
    subject: "Password Reset Token",
    html: `<h1>Your Password Reset Token is ${otp}</h1>`,
  };

  transport.sendMail(mailOptions, (error) => {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent successfully");
    }
  });
};

module.exports = { sendOtpToUser, sendPasswordResetToken };
