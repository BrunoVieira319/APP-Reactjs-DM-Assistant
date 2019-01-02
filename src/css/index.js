export default () => (`

@import url('https://fonts.googleapis.com/css?family=Skranji|Cantora+One');

.header {
  background-color: #354;
  height: 60px;
}

.header-container {
  background-color: #354;
  display: flex;
  justify-content: flex-end;
}

.link-header {
  font-family: 'Cantora One';
  font-size: 22px;
  padding: 14px;
  text-decoration: none;
  color: #FFF;
  transition: 0.4s;
  cursor: pointer;
}

.link-header:hover {
  background-color: #263;
}

.dropdown-content {
  display: none;
  position: absolute;
  background-color: #e9f5f5;
  min-width: 160px;
  z-index: 1;
}

.dropdown-content a {
  font-family: 'Cantora One';
  color: black;
  padding: 12px 16px;
  text-decoration: none;
  display: block;
}

.dropdown-content a:hover {
  background-color: #cdd;
}

.dropdown:hover .dropdown-content {
    display: block;
}

.dropdown:hover .dropbtn {        
  background-color: #263;
}

.body-container {
  margin-top: 30px;
}

`)
    