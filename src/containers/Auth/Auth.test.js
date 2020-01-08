import React from "react";
import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

import { Auth } from "./Auth";
import Input from "../../components/UI/Input/Input";
import Button from "../../components/UI/Button/Button";
import Spinner from "../../components/UI/Spinner/Spinner";

configure({ adapter: new Adapter() });

describe("<Auth />", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<Auth onSetAuthRedirectpath={() => {}} />);
  });

  it('should render at least one <Inpt /> component and two <Button></Button> componenets when there is no "loading" prop', () => {
    wrapper.setState({ controls: { email: {} } });
    expect(wrapper.find(Input)).toHaveLength(1);
    expect(wrapper.find(Button)).toHaveLength(2);
  });

  it('should render a <p></p> component when there is an "error" prop with an error message object', () => {
    wrapper.setProps({ error: { message: "errorMessage" } });
    expect(wrapper.find("p")).toHaveLength(1);
  });

  it("should render a <Spinner /> component when loading prop is true", () => {
    wrapper.setProps({ loading: true });
    expect(wrapper.find(Spinner)).toHaveLength(1);
  });
});
