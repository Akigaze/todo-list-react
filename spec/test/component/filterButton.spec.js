import React from "react";
import {shallow} from "enzyme";
import {FilterButton} from "../../../src/component/filterButton";

describe("Filter Button", function () {
    it("should render a input typeof Button with value from props", () => {
        const button = shallow(<FilterButton text="All"/>);

        expect(button.is("input[type='button']")).toBeTruthy();
        expect(button.prop("value")).toBe("All");
    });

    it("should be unclicked style when not clicked", () => {
        const button = shallow(<FilterButton clicked={false}/>);

        expect(button.prop("className")).toBe("filter-unclicked");
    });

    it("should be clicked style when clicked", () => {
        const button = shallow(<FilterButton clicked={true}/>);

        expect(button.prop("className")).toBe("filter-clicked");
    });

    it("should call handleClick with id and new click status when click", () => {
        const handleClickSpy = jest.fn();
        const button = shallow(<FilterButton id={1} clicked={false} handleClick={handleClickSpy}/>);
        button.simulate("click");

        expect(handleClickSpy).toHaveBeenCalledWith(1, true);
    });
});
