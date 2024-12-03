import { Link } from 'react-router-dom';

const Nav = styled.nav`
  background: #333;
  padding: 10px;
  display: flex;
  justify-content: space-around;
`;

const NavLink = styled(Link)`
  color: white;
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`;