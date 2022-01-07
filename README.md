# Devices List Project - Velozient

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

**The app is set to run on port 3001 to free port 3000 to the server.**

Runs the app in the development mode.\
Open [http://localhost:3001](http://localhost:3001) to view it in the browser.

All other CRA usual scripts are available as well.

## Project design

The app was developed using TypeScript - React for better development experience and scaling.

### Styling

**CSS modules and vanilla CSS were used** for every visual aspect of the app. No 3rd-party tools were used.\
Usage of CSS variables for colors to keep consistency across the app.\
The app has a **breakpoint at 768px**. The app is fully responsive.

### Code Structure

Relevant files: \
`App.tsx` Contains all app. Attaches styling to document body when modal is open.\
`AppContainer.tsx` Contains all functionality related to device management.\
`deviceModal.tsx` Is the create / update modal. Is fired from AppContainer and attached to the div root using a **React Portal**.\
`Api.ts` Contains all API related operations.

### Error Management

In the create/update modal, a device can't be registered if:
- A field is empty
- HDD Capacity has a non numeric value

An alert will be triggered if this happens.\
If there is any issue when fetching API data, an alert will with an error will be triggered.

## App behavior

Users can filter and sort devices.\
Any device updated / created will immediately be filtered and sorted.\
The modal can only be closed through the action buttons inside by arbitrary UX consideration.
