import React from 'react';
import './UsersListAdmin.scss';
import UsersCardAdmin from './UsersCardAdmin';

export default function UsersListAdmin({ users, deleteUser }) {

    return (
        <div className="users_list_container">
            <div class="profilesadmin d-flex align-items-center">
                <div class="container">
                    <div class="row gy-4 d-flex justify-content-between">
                        <div class="col-lg-6 order-2 order-lg-1 d-flex flex-column justify-content-center">
                            <h1>Users List</h1>
                        </div>
                    </div>
                </div>
            </div>
            <div className='table-responsive'>
                <table className="table" border="1">
                    <thead className="thead_users_list">
                        <tr>
                            <th>ID</th>
                            <th>Uuid</th>
                            <th>Username</th>
                            <th>Email</th>
                            <th>Type</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody className="tbody_users_list">
                        {
                            users.map((user, index) => (
                                <UsersCardAdmin key={index} user={user} deleteUser={deleteUser} />
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}