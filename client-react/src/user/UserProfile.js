import React from 'react'
import { Header, List } from 'semantic-ui-react'

export default function UserProfile (props) {
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
