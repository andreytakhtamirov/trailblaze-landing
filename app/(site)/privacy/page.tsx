import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | Trailblaze",
  description: "This is Docs page for Solid Pro",
  // other metadata
};

export default function TermsPage() {
  return (
    <>
      <section className="pb-16 pt-24 md:pb-20 md:pt-28 lg:pb-24 lg:pt-32">
        <div className="container mx-auto">
          <div className="-mx-4 flex flex-wrap">
            <div className="w-full px-4 lg:w-full">
              <div className="blog-details blog-details-docs shadow-three dark:bg-gray-dark rounded-sm bg-white px-8 py-11 sm:p-[55px] lg:mb-5 lg:px-8 xl:p-[55px]">
                <h1>Privacy Policy</h1>
                <p className="text-body-color dark:text-body-color-dark text-base">
                  Effective Date: December 11, 2023
                </p>
                <p className="text-body-color dark:text-body-color-dark text-base">
                  This Privacy Policy outlines how Trailblaze collects, uses,
                  discloses, and safeguards your personal information when you
                  use our mobile application and related services. This Privacy
                  Policy applies to all users of the Trailblaze application,
                  regardless of their geographical location.
                </p>

                <h4>1. Information We Collect</h4>
                <br />

                <h4>1.1 Personal Information</h4>
                <br />
                <ul className="ml-4">
                  <li>
                    When you create an account, we may collect your email
                    address, username, and profile picture.
                  </li>
                  <li>
                    Please note that Trailblaze does not store your password.
                    Account authentication is handled through Auth0, a trusted
                    third-party service.
                  </li>
                  <li>
                    When using Trailblaze, we may transmit location data, such
                    as GPS coordinates, to provide route generation and
                    navigation services.
                  </li>
                  <li>
                    If you choose to save and share routes, route data,
                    including starting and ending coordinates, will be stored on
                    our servers.
                  </li>
                </ul>
                <p className="text-body-color dark:text-body-color-dark text-base">
                  Trailblaze uses third-party services that may collect
                  anonymized information. Links to the privacy policies of
                  third-party service providers used by Trailblaze:
                </p>
                <ul className="ml-4">
                  <li>
                    Mapbox
                    <ul className="ml-4">
                      <li>
                        <a
                          href="https://www.mapbox.com/legal/privacy"
                          target="_blank"
                          className="underline"
                        >
                          Privacy Policy
                        </a>
                      </li>
                      <li>
                        <a
                          href="https://www.mapbox.com/telemetry"
                          target="_blank"
                          className="underline"
                        >
                          SDK Telemetry
                        </a>
                      </li>
                    </ul>
                  </li>
                  <li>
                    Auth0
                    <ul className="ml-4">
                      <li>
                        <a
                          href="https://auth0.com/docs/secure/data-privacy-and-compliance"
                          target="_blank"
                          className="underline"
                        >
                          Data Privacy
                        </a>
                      </li>
                    </ul>
                  </li>
                </ul>

                <h4>1.2 Non-Personal Information</h4>
                <br />
                <ul className="ml-4">
                  <li>
                    We may collect non-personal information such as device
                    information, app usage data, and statistical information to
                    improve our services.
                  </li>
                </ul>

                <h4>2. How We Use Your Information</h4>
                <br />

                <h4>2.1 Personal Information</h4>
                <br />
                <ul className="ml-4">
                  <li>
                    Your email address is used for account management purposes,
                    such as authentication and password recovery.
                  </li>
                  <li>
                    Your username may be displayed to other users when you save
                    and share routes or interact with social features.
                  </li>
                  <li>
                    Location data is used to calculate and display routes and
                    provide navigation services.
                  </li>
                  <li>
                    If you choose to post routes publicly, the information you
                    provide, including media, may be visible to other users.
                  </li>
                </ul>

                <h4>2.2 Non-Personal Information</h4>
                <br />
                <ul className="ml-4">
                  <li>
                    Non-personal information is used to improve our services and
                    enhance the user experience.
                  </li>
                </ul>

                <h4>3. Data Storage and Sharing</h4>
                <br />

                <h4>3.1 Data Storage and Deletion</h4>
                <br />
                <ul className="ml-4">
                  <li>
                    Your personal information is securely stored on both our
                    mobile database (for offline access) and our web-hosted
                    remote database (for synchronization across devices).
                  </li>
                  <li>
                    Within profile settings, you have the option to delete your
                    account, triggering the immediate removal of your data from
                    our databases associated with your account. This also
                    includes removal of your profile from Auth0, the
                    authentication provider.
                  </li>
                </ul>

                <h4>3.2 Data Sharing</h4>
                <br />
                <ul className="ml-4">
                  <li>
                    We do not share, sell, rent, or lease your personal
                    information to third parties.
                  </li>
                  <li>
                    We may share aggregated and anonymized data for analytics,
                    research, or business purposes. This data does not
                    personally identify you and is used solely to improve our
                    services.
                  </li>
                </ul>

                <h4>4. Data Security</h4>
                <br />

                <h4>4.1 Encryption and Data Access</h4>
                <br />
                <p className="text-body-color dark:text-body-color-dark text-base">
                  We employ industry-standard encryption protocols to safeguard
                  your personal information during transmission and storage.
                  This includes Secure Socket Layer (SSL) technology to encrypt
                  data in transit and robust encryption algorithms for data at
                  rest.
                </p>

                <h4>5. Your Choices</h4>
                <br />

                <h4>5.1 Account Information</h4>
                <br />
                <ul className="ml-4">
                  <li>
                    You can review and update your account information within
                    the Trailblaze app.
                  </li>
                  <li>
                    Additionally, within profile settings, you have the option
                    to delete your account. Upon account deletion, your personal
                    information associated with the account will be permanently
                    removed from our databases. Please note that this action is
                    irreversible and may result in the loss of access to
                    content, subscriptions, or services linked to your account.
                  </li>
                </ul>

                <h4>5.2 Location Data</h4>
                <br />
                <ul className="ml-4">
                  <li>
                    You have the ability to manage the app's access to location
                    data through your device settings. Disabling this feature
                    within your device settings may restrict or limit certain
                    functionalities within the app that rely on location
                    information.
                  </li>
                  <li>
                    Please note that specific features or services within the
                    app might require access to your location to provide
                    personalized experiences, location-based services, or
                    relevant content. Disabling location access may affect the
                    functionality of these features.
                  </li>
                  <li>
                    Location data is not shared without your consent or unless
                    required for specific app functionalities.
                  </li>
                </ul>

                <h4>6. Changes to this Privacy Policy</h4>
                <br />
                <p className="text-body-color dark:text-body-color-dark text-base">
                  We may update this Privacy Policy. We will notify you of any
                  significant changes through the app or via email. Please
                  review the policy periodically for the latest information on
                  our privacy practices.
                </p>

                <h4>7. Contact Us</h4>
                <br />
                <p className="text-body-color dark:text-body-color-dark text-base">
                  If you have any questions, concerns, or requests regarding
                  your personal information or this Privacy Policy, please
                  contact us at{" "}
                  <a
                    href="mailto:trailblaze.team@outlook.com"
                    className="underline"
                  >
                    trailblaze.team@outlook.com
                  </a>
                  .
                </p>
                <p className="text-body-color dark:text-body-color-dark text-base">
                  By using the Trailblaze mobile application and related
                  services, you agree to the terms outlined in this Privacy
                  Policy.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
