const users = [{
    name: "Aditya",
    gender: "male"
},{
    name: "Rohan",
    gender: "male"
},{
    name: "Priya",
    gender: "female"
}]

for (let i = 0; i < users.length; i++) {
    if (users[i]["gender"] == "male") {
        console.log(users[i]["name"]);
    }
}

// can also write users.name instead of users[i]["name"]