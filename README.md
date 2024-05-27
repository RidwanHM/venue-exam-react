
![Logo](https://github.com/RidwanHM/venue-exam-react/assets/112473640/7a40155e-7766-496e-ac4c-b13e583d373f)



Project Brief:

Holidaze, a newly launched accommodation booking platform, requires the development of a modern front-end for their application. The project involves creating both a customer-facing side for booking holidays and an admin-facing side for managing venues and bookings. The design and user experience are open to interpretation, but must adhere to the specified functional requirements as detailed in the API documentation.

Goal:

The objective of this project is to apply the skills acquired over the past two years to develop a comprehensive front-end application for a new accommodation booking site called Holidaze. The project aims to demonstrate the candidate's overall development capabilities, encompassing visual and technical skills, with a focus on producing a professional-grade product.

Requirements:
The project focuses solely on the front-end application, utilizing the Holidaze API. Key user stories and technical restrictions have been provided to guide the development process.

User Stories:

Users can view a list of venues.
Users can search for specific venues.
Users can view details of a specific venue.
Users can see available dates for a venue on a calendar.
Users with a stud.noroff.no email can register as customers.
Registered customers can create bookings.
Registered customers can view their upcoming bookings.
Users with a stud.noroff.no email can register as venue managers.
Registered venue managers can create, update, and delete venues.
Registered venue managers can view bookings for their venues.
Registered users can log in, update their avatar, and log out.



Summary each page and its components:

HomePage

Summary:
The HomePage displays the main content of the website, which includes a list of venues fetched from the Holidaze API. Users can search for specific venues and view detailed information about each one.

Components:
Navigation: This component renders the navigation bar at the top of the page, providing links to various parts of the site.
Homefetch: This component fetches a list of venues from the API and displays them. It includes a search bar that allows users to filter venues by name.
Footer: This component renders the footer at the bottom of the page, providing additional navigation links and site information.


ListingPage

Summary:
The ListingPage allows venue managers to create new venue listings. It provides a form for entering the details of a new venue and submitting them to the Holidaze API.

Components:
Navigation: This component renders the navigation bar at the top of the page, providing links to various parts of the site.
AuctionListingForm: This component provides a form for venue managers to input details for a new venue listing, including name, description, price, and amenities. The form submits the data to the API.
Footer: This component renders the footer at the bottom of the page, providing additional navigation links and site information.


LoginPage

Summary:
The LoginPage provides a login interface for users. It includes a form for entering an email and password to authenticate and log into the site.

Components:
Navigation: This component renders the navigation bar at the top of the page, providing links to various parts of the site.
LoginForm: This component provides a form for users to enter their email and password, which are then submitted to the Holidaze API for authentication.
Footer: This component renders the footer at the bottom of the page, providing additional navigation links and site information.


ProfilePage

Summary:
The ProfilePage displays the user's profile information, including their bookings and personal details. It allows users to view and manage their account information.

Components:
Navigation: This component renders the navigation bar at the top of the page, providing links to various parts of the site.
ProfilePage: This component displays the user's profile information, including their bookings and personal details.
Footer: This component renders the footer at the bottom of the page, providing additional navigation links and site information.


RegisterPage

Summary:
The RegisterPage allows new users to create an account. It includes a form for entering personal details, email, password, and an option to register as a venue manager.

Components:
Navigation: This component renders the navigation bar at the top of the page, providing links to various parts of the site.
RegisterForm: This component provides a form for users to enter their personal details, email, password, and other required information to create a new account.
Footer: This component renders the footer at the bottom of the page, providing additional navigation links and site information.






ListingsPage


Summary:
The ListingsPage displays detailed information about a specific venue. It includes options for viewing available dates and booking the venue.

Components:
Navigation: This component renders the navigation bar at the top of the page, providing links to various parts of the site.

VenueDetail: This component fetches and displays detailed information about a specific venue, including images, description, price, amenities, and location. It also includes options for checking available dates and booking.

Footer: This component renders the footer at the bottom of the page, providing additional navigation links and site information.

Component Descriptions:

Homefetch Component:
The Homefetch component fetches and displays a list of venues from the Holidaze API. It includes a search bar for filtering venues by name and displays venue details such as name, description, price, and amenities.

AuctionListingForm Component:
The AuctionListingForm component provides a form for creating new venue listings. It includes fields for venue details like name, description, price, maximum guests, and amenities. The form submits the data to the Holidaze API.

LoginForm Component:
The LoginForm component provides a login form for user authentication. It collects email and password, sends them to the Holidaze API for authentication, and handles login errors.

ProfilePage Component:
The ProfilePage component displays the user's profile information and bookings. It shows personal details, avatar, and a list of upcoming bookings. It allows users to manage their account information.


RegisterForm Component:
The RegisterForm component provides a registration form for creating new user accounts. It collects personal details, email, password, and an option to register as a venue manager. It submits the data to the Holidaze API.

VenueDetail Component:
The VenueDetail component fetches and displays detailed information about a specific venue. It shows images, description, price, amenities, location, and options for checking dates and booking. It handles loading and error states.
By understanding the structure and functionality of each page and its components, you can effectively navigate and manage the Holidaze accommodation booking application.

Links:

Netlify:
https://frolicking-torte-6fcb32.netlify.app/

Figma:
https://www.figma.com/design/SMFCr8jZw7XMfaFcze0m8G/Holidaze?node-id=0-1&t=hhexe6l02lZZZ2Fi-1

GitHub:
https://github.com/RidwanHM/venue-exam-react/tree/master/src


Trello:
https://trello.com/b/b88ibz8x/exam-2024
