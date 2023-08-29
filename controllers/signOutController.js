// controllers/signOutController.js
module.exports = {
    signOut: (req, res) => {
        try {
            res.clearCookie('token'); // Clear the authentication token cookie
            res.status(200).json({ message: "Sign-out successful" });
        } catch (error) {
            console.log(error.message);
            res.status(500).json({ error: "Internal server error" });
        }
    }
};
