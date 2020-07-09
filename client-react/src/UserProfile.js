import React from 'react'
import { Header, List } from 'semantic-ui-react'


export default function UserProfile () {
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
                  Marshall Mathers
                </List.Description>
              </List.Content>
            </List.Item>
            <List.Item>
              <List.Content>
                <List.Header>Job Title</List.Header>
                <List.Description>
                  Fireman
                </List.Description>
              </List.Content>
            </List.Item>
            <List.Item>
              <List.Content>
                <List.Header>City</List.Header>
                <List.Description>
                  Detroit, MI
                </List.Description>
              </List.Content>
            </List.Item>
            <List.Item>
              <List.Content>
                <List.Header>County</List.Header>
                <List.Description>
                  Detroit County Name
                </List.Description>
              </List.Content>
            </List.Item>
            <List.Item>
              <List.Content>
                <List.Header>District ( Conditional )</List.Header>
                <List.Description>
                  Random Number
                </List.Description>
              </List.Content>
            </List.Item>
          </List>
        </div>
      </div>
    </div>
  )
}
