import React from "react";
import axios from "axios";

const instance = axios.create({
    baseURL: "https://api.themoviedb.org/3/",
    headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzNGNjM2EzNGFmZDdmZjYwNmRkNWIzYjcwOGFhYzBkNSIsIm5iZiI6MTczODc3NDk1Mi42ODgsInN1YiI6IjY3YTM5OWE4MjU4OGMwZDMyYjhhN2RiOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.m7D6O5JONnz45_e4jcqYTA-oOBHlRtYdvtu0c9lUzLI'
      }
})

export default instance;