const Dashboard = () => {
  return (
    <div>
      <h1>Welcome to Dashboard</h1>
      <button onClick={() => {
        localStorage.removeItem("token");
        window.location.href = "/login";
      }}>
        Logout
      </button>
    </div>
  );
};

export default Dashboard;
