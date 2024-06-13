function AccountDetail({ logout, user }) {
    return (
        <div>
            <h1>AccountDetail</h1>
            {user?.email && (
                <div>
                    <h2>
                        Welcome, {user.firstName} {user.lastName}!
                    </h2>
                    <p>Email: {user.email}</p>
                </div>
            )}
            <button onClick={logout}>Logout</button>
        </div>
    );
}

export default AccountDetail;
