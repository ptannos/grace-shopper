import React from "react";
import { fetchSingleUser, updateUser } from "../store/singleUser";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

class SingleUser extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      firstName: "",
      lastName: "",
      username: "",
      password: "",
      email: "",
    };
    this.handleEdit = this.handleEdit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    const id = this.props.match.params.id;
    this.props.loadSingleUser(id);
  }

  handleChange(evt) {
    this.setState({
      [evt.target.name]: evt.target.value,
    })
  }

  handleEdit(event) {
    event.preventDefault()
    this.props.editUser({
      ...this.state,
      id: this.props.user.id,
    })
  }

  render() {
    const user = this.props.user || {}
    const { isLoggedIn } = this.props
    const { handleChange, handleEdit } = this
    const { firstName, lastName, username, email } = this.state

    return (
      <div className="user">
        <h3>My Info</h3>
        <table>
          <tbody>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Username</th>
              <th>Email</th>
            </tr>
            <tr>
              <td>{user.firstName}</td>
              <td>{user.lastName}</td>
              <td>{user.username}</td>
              <td>{user.email}</td>
            </tr>
          </tbody>
        </table>
        <Link to={`/orders/user/${user.id}`}>
          <button>View Order History</button>
        </Link>
        <br />
        {isLoggedIn ? (
          <form id="product-form" onSubmit={handleEdit}>
            <h3>Edit My Info</h3>
            <label htmlFor="firstName">First Name:</label>
            <input name="firstName" onChange={handleChange} value={firstName} />

            <label htmlFor="lastName">Last Name:</label>
            <input name="lastName" onChange={handleChange} value={lastName} />

            <label htmlFor="username">Username:</label>
            <input name="username" onChange={handleChange} value={username} />

            <label htmlFor="email">Email:</label>
            <input name="email" onChange={handleChange} value={email} />
            <button type="submit">Submit</button>
          </form>
        ) : (
          <div>You must be lost! Login again to see your account.</div>
        )}
      </div>
    );
  }
}

const mapState = (state) => {
  console.log("state in singleuser", state)
  return {
    user: state.singleUser,
    isLoggedIn: !!state.auth.id,
  }
}

const mapDispatch = (dispatch) => {
  return {
    loadSingleUser: (id) => dispatch(fetchSingleUser(id)),
    editUser: (id) => dispatch(updateUser(id)),
  }
}

export default connect(mapState, mapDispatch)(SingleUser)
