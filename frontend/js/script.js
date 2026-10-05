/* =========================================
   CAMPUSCONNECT
   MANPREET - AUTHENTICATION & PROFILE
========================================= */


/* =========================================
   REGISTER
========================================= */

const registerForm =
    document.querySelector("#registerForm");

let selectedProfilePhoto = "";


if (registerForm) {

    const profilePhoto =
        document.querySelector("#profilePhoto");

    const preview =
        document.querySelector("#registerPhotoPreview");

    const placeholder =
        document.querySelector("#photoPlaceholder");


    /* PROFILE PHOTO SELECT */

    profilePhoto.addEventListener(
        "change",
        function () {

            const file =
                profilePhoto.files[0];

            if (!file) {
                return;
            }


            /* FILE SIZE */

            if (file.size > 2 * 1024 * 1024) {

                alert(
                    "Profile picture must be less than 2 MB."
                );

                profilePhoto.value = "";

                return;
            }


            /* FILE TYPE */

            if (
                file.type !== "image/jpeg" &&
                file.type !== "image/png"
            ) {

                alert(
                    "Please select a JPG or PNG image."
                );

                profilePhoto.value = "";

                return;
            }


            const reader =
                new FileReader();


            reader.onload =
                function (event) {

                    selectedProfilePhoto =
                        event.target.result;


                    preview.src =
                        selectedProfilePhoto;


                    preview.style.display =
                        "block";


                    placeholder.style.display =
                        "none";

                };


            reader.readAsDataURL(file);

        }
    );


    /* REGISTER SUBMIT */

    registerForm.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();


            const name =
                document
                    .querySelector("#name")
                    .value
                    .trim();


            const roll =
                document
                    .querySelector("#roll")
                    .value
                    .trim();


            const email =
                document
                    .querySelector("#email")
                    .value
                    .trim();


            const phone =
                document
                    .querySelector("#phone")
                    .value
                    .trim();


            const password =
                document
                    .querySelector("#password")
                    .value;


            const confirmPassword =
                document
                    .querySelector("#confirm-password")
                    .value;


            const terms =
                document
                    .querySelector("#terms")
                    .checked;


            /* NAME */

            if (name.length < 3) {

                alert(
                    "Please enter your full name."
                );

                return;
            }


            /* ROLL */

            if (roll.length < 5) {

                alert(
                    "Please enter a valid roll number."
                );

                return;
            }


            /* PHONE */

            const phonePattern =
                /^[0-9]{10}$/;


            if (!phonePattern.test(phone)) {

                alert(
                    "Please enter a valid 10-digit phone number."
                );

                return;
            }


            /* PASSWORD */

            if (password.length < 8) {

                alert(
                    "Password must contain at least 8 characters."
                );

                return;
            }


            /* CONFIRM PASSWORD */

            if (password !== confirmPassword) {

                alert(
                    "Passwords do not match."
                );

                return;
            }


            /* TERMS */

            if (!terms) {

                alert(
                    "Please accept the Terms & Conditions."
                );

                return;
            }


            /* SAVE USER */

            localStorage.setItem(
                "studentName",
                name
            );


            localStorage.setItem(
                "studentRoll",
                roll
            );


            localStorage.setItem(
                "studentEmail",
                email
            );


            localStorage.setItem(
                "studentPhone",
                phone
            );


            localStorage.setItem(
                "studentPassword",
                password
            );


            /* SAVE PHOTO */

            if (selectedProfilePhoto !== "") {

                localStorage.setItem(
                    "studentProfilePhoto",
                    selectedProfilePhoto
                );

            }


            alert(
                "Registration successful!"
            );


            window.location.href =
                "login.html";

        }
    );

}


/* =========================================
   PASSWORD STRENGTH
========================================= */

const passwordInput =
    document.querySelector("#password");


if (passwordInput) {

    passwordInput.addEventListener(
        "input",
        function () {

            const password =
                passwordInput.value;


            const bar =
                document.querySelector(
                    "#strengthBar"
                );


            const message =
                document.querySelector(
                    "#passwordMessage"
                );


            if (password.length === 0) {

                bar.style.width =
                    "0%";

                message.textContent =
                    "Use at least 8 characters.";

            }

            else if (password.length < 8) {

                bar.style.width =
                    "30%";

                message.textContent =
                    "Weak password.";

            }

            else if (password.length < 12) {

                bar.style.width =
                    "65%";

                message.textContent =
                    "Medium password.";

            }

            else {

                bar.style.width =
                    "100%";

                message.textContent =
                    "Strong password.";

            }

        }
    );

}


/* =========================================
   LOGIN
========================================= */

const loginForm =
    document.querySelector("#loginForm");


if (loginForm) {

    loginForm.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();


            const identity =
                document
                    .querySelector("#loginIdentity")
                    .value
                    .trim();


            const password =
                document
                    .querySelector("#loginPassword")
                    .value;


            const registeredEmail =
                localStorage.getItem(
                    "studentEmail"
                );


            const registeredRoll =
                localStorage.getItem(
                    "studentRoll"
                );


            const registeredPassword =
                localStorage.getItem(
                    "studentPassword"
                );


            const identityMatches =
                identity === registeredEmail ||
                identity === registeredRoll;


            if (
                identityMatches &&
                password === registeredPassword
            ) {

                localStorage.setItem(
                    "isLoggedIn",
                    "true"
                );


                alert(
                    "Login successful!"
                );


                window.location.href =
                    "dashboard.html";

            }

            else {

                alert(
                    "Invalid Roll Number/Email or Password."
                );

            }

        }
    );

}


/* =========================================
   SHOW / HIDE PASSWORD
========================================= */

function togglePassword(
    inputId,
    button
) {

    const input =
        document.getElementById(
            inputId
        );


    if (input.type === "password") {

        input.type =
            "text";

        button.textContent =
            "Hide";

    }

    else {

        input.type =
            "password";

        button.textContent =
            "Show";

    }

}


/* =========================================
   FORGOT PASSWORD
========================================= */

function forgotPassword(event) {

    event.preventDefault();

    alert(
        "Password reset will be connected to the backend."
    );

}


/* =========================================
   PROFILE PAGE
========================================= */

const profileName =
    document.querySelector(
        "#profile-name"
    );


if (profileName) {

    const name =
        localStorage.getItem(
            "studentName"
        ) || "Student";


    const roll =
        localStorage.getItem(
            "studentRoll"
        ) || "-";


    const email =
        localStorage.getItem(
            "studentEmail"
        ) || "-";


    const phone =
        localStorage.getItem(
            "studentPhone"
        ) || "-";


    profileName.textContent =
        name;


    document.querySelector(
        "#profile-roll"
    ).textContent =
        roll;


    document.querySelector(
        "#profile-email"
    ).textContent =
        email;


    document.querySelector(
        "#profile-phone"
    ).textContent =
        phone;


    /* LOAD PROFILE PHOTO */

    const savedPhoto =
        localStorage.getItem(
            "studentProfilePhoto"
        );


    const profileImage =
        document.querySelector(
            "#profileImage"
        );


    const defaultIcon =
        document.querySelector(
            "#defaultProfileIcon"
        );


    if (
        savedPhoto &&
        profileImage
    ) {

        profileImage.src =
            savedPhoto;


        profileImage.style.display =
            "block";


        if (defaultIcon) {

            defaultIcon.style.display =
                "none";

        }

    }

}


/* =========================================
   CHANGE PROFILE PHOTO
========================================= */

const changePhoto =
    document.querySelector(
        "#changeProfilePhoto"
    );


if (changePhoto) {

    changePhoto.addEventListener(
        "change",
        function () {

            const file =
                changePhoto.files[0];


            if (!file) {
                return;
            }


            if (file.size > 2 * 1024 * 1024) {

                alert(
                    "Profile picture must be less than 2 MB."
                );

                changePhoto.value = "";

                return;
            }


            if (
                file.type !== "image/jpeg" &&
                file.type !== "image/png"
            ) {

                alert(
                    "Please select a JPG or PNG image."
                );

                changePhoto.value = "";

                return;
            }


            const reader =
                new FileReader();


            reader.onload =
                function (event) {

                    const image =
                        event.target.result;


                    localStorage.setItem(
                        "studentProfilePhoto",
                        image
                    );


                    const profileImage =
                        document.querySelector(
                            "#profileImage"
                        );


                    const defaultIcon =
                        document.querySelector(
                            "#defaultProfileIcon"
                        );


                    profileImage.src =
                        image;


                    profileImage.style.display =
                        "block";


                    if (defaultIcon) {

                        defaultIcon.style.display =
                            "none";

                    }

                };


            reader.readAsDataURL(file);

        }
    );

}


/* =========================================
   EDIT PROFILE
========================================= */

function editProfile() {

    const currentName =
        localStorage.getItem(
            "studentName"
        ) || "";


    const newName =
        prompt(
            "Enter your new name:",
            currentName
        );


    if (
        newName &&
        newName.trim() !== ""
    ) {

        localStorage.setItem(
            "studentName",
            newName.trim()
        );


        location.reload();

    }

}


/* =========================================
   LOGOUT
========================================= */

function logout() {

    localStorage.removeItem(
        "isLoggedIn"
    );


    window.location.href =
        "login.html";

}