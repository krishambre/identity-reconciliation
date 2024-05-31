# Identity Reconciliation

## Description
This is an application that links different orders made with different contact information to the same person. We keep a track of the collected contact information in a relational database table named `Contact`. 

```
{
    id                   Int                   
    phoneNumber          String?
    email                String?
    linkedId             Int? // the ID of another Contact linked to this one
    linkPrecedence       "secondary"|"primary" // "primary" if it's the first Contact in the link
    createdAt            DateTime              
    updatedAt            DateTime              
    deletedAt            DateTime?
}
```

One customer can have multiple `Contact` rows in the database against them. All of the rows are linked together with the oldest one being treated as "primary” and the rest as “secondary” . `Contact` rows are linked if they have either of `email` or `phone` as common.

Primary contacts can also turn into secondary contacts if we get a request with `email` of one contact and `phoneNumber` of another. Hence both contacts will be linked as a result

## Table of Contents
- [Installation](#installation)
- [Usage](#usage)

## Installation
To install and set up the project, use the following command: `npm install`

To run the project use : `npm run start`


## Usage
The app is hosted at https://identity-reconciliation-ommc.onrender.com/identify . This is a POST endpoint and can be used along with the following request body 
```
{
	"email"?: string,
	"phoneNumber"?: number
}
```

The response format is as follows: 
```
{
	"contact":{
		"primaryContatctId": number,
		"emails": string[], // first element being email of primary contact 
		"phoneNumbers": string[], // first element being phoneNumber of primary contact
		"secondaryContactIds": number[] // Array of all Contact IDs that are "secondary" to the primary contact
	}
}
```

