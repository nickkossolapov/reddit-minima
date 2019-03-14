import axios from "axios";
import * as enzyme from "enzyme";
import * as React from "react";

import * as postsData from "./test-data/posts-data.json";
import App from "./app";

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;
mockedAxios.get.mockReturnValue(postsData as any);

it('should contain an image after loading', async () => {
  const wrapper = enzyme.mount(<App/>);

  await setTimeout(() => {
    expect(wrapper.find('img')).toHaveLength(1);
  }, 500);
});
