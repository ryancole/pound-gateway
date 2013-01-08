This is the server component of my mobile IRC client. The client has no name, yet. I'm waiting for one to come to me.

## What function does this serve?

This server component maintains the persistent connection to IRC and exposes an HTTP-based API for consuming the IRC data remotely. Clients can consume the IRC data as they would any other HTTP-based API. This configuration relieves mobile clients of the IRC connection duty.

## How does it work?

This application is basically a BNC, but instead of speaking IRC to end-users, it speaks HTTP/JSON. This will maintain the actual IRC connection and log all chat events to a database. It will also listen for incoming HTTP requests, to which it will respond with various bits of information about the active IRC connection - such as current channels, users and chat messages.

## Why not ZNC?

When considering ZNC for this project, I looked into push notifications, custom modules and the replay functionality. With a custom module I could directly log the IRC data to CouchDB, but I don't see a way to build in a web server to expose an HTTP front-end to that data. So, I'd need additional software for the web server. Also, push notifications are not what I want. I don't want mobile clients to have to be active and running, or the phone to have to be turned on, to recieve push notifications. I want this to be able to be used in a pull manner so that the same data can be queried over and over whenever needed, similar to Twitter. With this considered, I don't think ZNC would work.

Now, since this is just an IRC client it could easily be configured to connect to your ZNC server so that you do not have to run 2 IRC connections. I see that as being the best of both worlds, while allowing this to be used without ZNC.

## HTTP API

I will document the API endpoints here.