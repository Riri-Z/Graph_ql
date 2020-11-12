import React from "react"
import { render } from "react-dom"
import { ApolloClient, InMemoryCache, ApolloProvider, useQuery, gql } from "@apollo/client"
import "./index.css"
const client = new ApolloClient({
  uri: "https://api.spacex.land/graphql/",
  cache: new InMemoryCache(),
})

function FindLaunches() {
  const { loading, error, data } = useQuery(gql`
    {
      launches(limit: 5) {
        launch_date_utc
        launch_success
        rocket {
          rocket_name
        }
        links {
          video_link
        }
        details
        id
      }
    }
  `)

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error :(</p>

  return data.launches.map(data => (
    <div class="card" key={data.id}>
      <br />
      {console.log(data)}
      <p>{data.launch_date_utc}</p>
      <p>{data.rocket.rocket_name}</p>
      <p>{data.details}</p>
    </div>
  ))
}

function App() {
  return (
    <ApolloProvider client={client}>
      <div>
        <h2>My first Apollo app 🚀</h2>
        <FindLaunches />
      </div>
    </ApolloProvider>
  )
}

render(<App />, document.getElementById("root"))
