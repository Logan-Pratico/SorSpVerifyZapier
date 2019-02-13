// We recommend writing your creates separate like this and rolling them
// into the App definition at the end.
module.exports = {
  key: 'SameOrSimilarInquiry',

  // You'll want to provide some helpful display labels and descriptions
  // for users. Zapier will put them into the UX.
  noun: 'SameOrSimilarInquiry',
  display: {
    label: 'Generates Same or Similar Inquiry Call',
    description: 'Same or Similar checks across all 4 medicare jurisdictions.'
  },

  // `operation` is where the business logic goes.
  operation: {
    inputFields: [
      {key: 'User', required: true, type: 'string'},
      {key: 'memberId', required: true, type: 'string'},
      {key: 'patientFirstName', required: true, type: 'string'},
      {key: 'patientLastName', required: true, type: 'string'},
      {key: 'patientStateCode', required: true, type: 'string'},
      {key: 'patientDOB', required: true, type: 'string'},
      {key: 'hcpcsCodes', required: true, type: 'string'},
      {key: 'date_Of_Service_start', required: false, type: 'string'},
      {key: 'date_Of_Service_end', required: false, type: 'string'},
      {key: 'location', required: false, type: 'string'},
    ],
    perform: (z, bundle) => {
      const promise = z.request({
        url: 'https://api.pverify.com/API/SameOrSimilarInquiry',
        method: 'POST',
        body: JSON.stringify({
          memberId: bundle.inputData.memberId,
          patientFirstName: bundle.inputData.patientFirstName,
          patientLastName: bundle.inputData.patientLastName,
          patientDOB: bundle.inputData.patientDOB,
          patientStateCode: bundle.inputData.patientStateCode,
	  hcpcsCodes: bundle.inputData.hcpcsCodes,
          dosStart: bundle.inputData.date_Of_Service_start,
          dosEnd: bundle.inputData.date_Of_Service_end,
          location: bundle.inputData.location,
        }),
        headers: {
          'content-type': 'application/json',
	  'Client-User-Name': bundle.inputData.User,
          // This is NOT how you normally do authentication. This is just to demo how to write a create here.
          // Refer to this doc to set up authentication:
          // https://zapier.github.io/zapier-platform-cli/#authentication
          'X-API-Key': 'secret'
        }
      });

      return promise.then((response) => JSON.parse(response.content));
    },

	
}

};
