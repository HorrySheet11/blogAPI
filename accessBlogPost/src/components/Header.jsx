import { useNavigate } from "react-router-dom";
import {useState, useContext} from 'react';
import './Header.css';
import { AuthContext } from "../context/AuthContext.jsx";

function Header() {
  const { user, loading } = useContext(AuthContext);

  const nav = useNavigate();
	return (
		<div className="header">
			<h2>Horry Blog</h2>
			{user && <h3>Welcome {user.username}</h3>}
			<ul>
				<li>
					<button type="button" onClick={()=>nav('/')}>Home</button>
				</li>
				{!user ? (
					<>
						<li>
							<button type="button" onClick={()=>nav('/log-in')}>Log in</button>
						</li>
						<li>
							<button type="button" onClick={()=>nav('/sign-up')}>Sign up</button>
						</li>
					</>
        ) : (
          <>
            <li>
              <button type="button" onClick={()=>nav('new-post')}>New Post</button>
            </li>
            <li>
              <button type="button" onClick={()=>nav('/log-out')}>Log out</button>
            </li>
          </>
        )}
			</ul>
		</div>
	);
}

export default Header;
