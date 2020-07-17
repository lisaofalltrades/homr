import React, { Component } from 'react'
import { Header, List } from 'semantic-ui-react'


export default function UserProfile (props) {
  console.log(props, 'Props from User Profile')
//   profileData:
// admin: true
// city: "Portland"
// county: "Or"
// district: "1"
// email: "test@test.com"
// first_name: "Austen"
// job_title: "fire fighter"
// last_name: "Cote"
// password: "$2b$04$niN4sCk7uc7iWSGFpIePhOfJYQ9ZkKTQxf3D5MNtzRsjGdbT91PIC"
// role: "fire_chief"
// status: ""
// __v: 0
// _id: "5f0ca375510a2c10e8128e75"

  return (

    <div style={{ 'text-align': 'left' }}>
      <Header as='h1'>My Profile</Header>
      <div id='userProfile'>
        <div>
          <List>
            <List.Item>
              <List.Content>
                <List.Header>Full Name</List.Header>
                <List.Description>
                  {props.profileData.first_name} {props.profileData.last_name}
                </List.Description>
              </List.Content>
            </List.Item>
            <List.Item>
              <List.Content>
                <List.Header>Job Title</List.Header>
                <List.Description>
                  {props.profileData.job_title}
                </List.Description>
              </List.Content>
            </List.Item>
            <List.Item>
              <List.Content>
                <List.Header>City</List.Header>
                <List.Description>
                  {props.profileData.city}
                </List.Description>
              </List.Content>
            </List.Item>
            <List.Item>
              <List.Content>
                <List.Header>County</List.Header>
                <List.Description>
                  {props.profileData.county}
                </List.Description>
              </List.Content>
            </List.Item>
            <List.Item>
              {props.profileData.role === 'fire_chief'
                ? <List.Content>
                  <List.Header>District ( Conditional )</List.Header>
                  <List.Description>
                    {props.profileData.district}
                  </List.Description>
                </List.Content>
                : null}
            </List.Item>
          </List>
        </div>
      </div>
    </div>
  )
}
