import React from 'react'
import { useState, useEffect } from 'react'


function CreatePost() {
    const [postData, setpostData] = useState({ user: "", item: "", comments: [] }); //pretty much a copy of the comment form
    const auth_token = localStorage.getItem("auth_token")
    useEffect(() => {
        fetch("/private/", {
            method: "GET",
            headers: {
                "authorization": "Bearer " + auth_token
            },
            mode: "cors"
        })
            .then(response => response.json())
            .then(data => {
                console.log(data);
                setpostData({ user: data.username }) //fetch userdata
            })
    }, [])


    const submit = (e) => { //submit the post
        e.preventDefault();
        fetch("/private/post", {
            method: "POST",
            headers: {
                "Content-type": "application/json",
                "authorization": "Bearer " + auth_token
            },
            body: JSON.stringify(postData),
            mode: "cors"
        })
            .then(response => response.json())
            .then(data => {
                console.log(data);
                window.location.href = "/posts/"
            })
    }
    const change = (e) => {
        setpostData({ ...postData, [e.target.name]: e.target.value }) //setting data on change
    }
    const setData = () =>{ //setting data on Click of the submit button
        const d = new Date()
        const date = d.toLocaleDateString();
        setpostData({...postData, time: date})
        
    }
    return (
        <div>
            <h1>Create a Post</h1>
            <div className="container col s6">
                <div className="row">
                    <form onSubmit={submit} id="post-form" onChange={change}>
                        <label htmlFor="title">Title</label>
                        <input type="text" name="title" id="title" required />
                        <div className="input-field col s12">
                            <textarea id="textarea1" className="materialize-textarea" name="item" required></textarea>
                            <label for="textarea1">Write your Post here</label>
                        </div>
                        <input type="submit" className="btn" name="button" value="Submit" onClick={setData}/>
                    </form>
                </div>
            </div>
        </div>

    ) //Post submition form
}

export default CreatePost