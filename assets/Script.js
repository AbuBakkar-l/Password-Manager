    // show password in ** Form
    function maskPassword(pass) {
    let str = "";
    for (let index = 0; index < pass.length; index++) {
        str += "*";
    }
    return str;
    }
    // copyText function,
    function copyText(txt) {
    navigator.clipboard.writeText(txt).then(
        () => {
        alert("copied the text" + txt);
        },
        () => {
        alert("failed to copy the text");
        }
    );
    }
    // delete Btn,
    const deletePass = (website) => {
    let data = localStorage.getItem("passwords");
    let arr = JSON.parse(data);
    let arrUpdate = arr.filter((e) => {
        return e.website != website;
    });
    localStorage.setItem("password", JSON.stringify(arrUpdate));
    alert(`successfully deleted ${website}'s password`);
    ShowPasswords();
    };
    // show data in table,
    const ShowPasswords = () => {
    let tb = document.querySelector("table");
    let data = localStorage.getItem("passwords");
    if (data == null || JSON.parse(data).length == 0) {
        tb.innerHTML = "No data to show";
    }
    else 
    {
        tb.innerHTML = `
        <tr>
            <th>Website</th>
            <th>UserName</th>
            <th>Password</th>
            <th>Delete</th>
        </tr>
        `
        let arr = JSON.parse(data)
        let str = ""
        for (let i = 0; i < arr.length; i++)
        {
        const element = arr[i];
        str += `
            <tr>
                <td>${element.website} <img onClick="copyText('${
            element.website
        }')" src ="./assets/img/copy.svg" width = "15" height = "20"> </td>
                <td>${element.username} <img onClick="copyText('${
            element.website
        }')" src ="./assets/img/copy.svg" width = "15" height = "20"> </td>
                <td>${maskPassword(element.password)} <img onClick="copyText('${
            element.website
        }')" src ="./assets/img/copy.svg" width = "15" height = "20"> </td>
                <td><button  class="tabel-btn" onClick="deletePass('${
                element.website
                }')"> Delete </button></td>
            </tr>
            `;
        }

        tb.innerHTML = tb.innerHTML + str

    }
    website.value = ""
    username.value = ""
    password.value = ""
    }

    // localStorage
    ShowPasswords()
    document.querySelector(".btn").addEventListener("click", (e) => {
    e.preventDefault();
    console.log(username.value, password.value, website.value);
    let passwords = localStorage.getItem("passwords")
    console.log(passwords)
    if (passwords == null) {
        let json = []
        json.push({
        website: website.value,
        username: username.value,
        password: password.value,
        })
        alert("your password has been saved");
        localStorage.setItem("passwords", JSON.stringify(json))
    } else {
        let json = JSON.parse(localStorage.getItem("passwords"))
        json.push({website: website.value, username: username.value, password: password.value,
        });
        alert("your password has been saved");
        localStorage.setItem("passwords", JSON.stringify(json))
    }
    ShowPasswords();
    });
