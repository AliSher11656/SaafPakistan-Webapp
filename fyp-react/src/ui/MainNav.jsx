import { NavLink } from "react-router-dom";
import styled from "styled-components";

const NavList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
`;

const StyledNavLink = styled(NavLink)``;

function MainNav() {
  return (
    <nav>
      <NavList>
        <li>
          <StyledNavLink to="/">
            <span>Home</span>
          </StyledNavLink>
        </li>
        <li>
          <StyledNavLink to="/riders">
            <span>Riders</span>
          </StyledNavLink>
        </li>

        <li>
          <StyledNavLink to="/warehouseManager">
            <span>Warehouse Manager</span>
          </StyledNavLink>
        </li>

        <li>
          <StyledNavLink to="/users">
            <span>Users</span>
          </StyledNavLink>
        </li>
        <li>
          <StyledNavLink to="/payments">
            <span>Payments</span>
          </StyledNavLink>
        </li>
        <li>
          <StyledNavLink to="/settings">
            <span>Settings</span>
          </StyledNavLink>
        </li>
      </NavList>
    </nav>
  );
}

export default MainNav;
