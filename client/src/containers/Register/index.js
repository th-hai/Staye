import React, { useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { Redirect, Link } from 'react-router-dom';
import { Form, Input, InputNumber, Button, Spin } from 'antd';
import { Password } from './styles';
import { useInjectSaga } from 'utils/injectSaga';
import registerUserSaga from './saga';
import { connect, useDispatch } from 'react-redux';
import { compose, bindActionCreators } from 'redux';
import * as actions from './actions';
import { useInjectReducer } from 'utils/injectReducer';
import registerReducer from './reducer';
import { createStructuredSelector } from 'reselect';
import { makeSelectIsPending, makeSelectIsSuccessful } from './selectors';
import { REDIRECT } from './constants'
const layout = {
  labelCol: { span: 0 },
  wrapperCol: { span: 24 },
};

const Register = ({ registerUser, isPending, isSuccessful }) => {
  useInjectSaga({ key: 'register', saga: registerUserSaga });
  useInjectReducer({ key: 'register', reducer: registerReducer });
  const [form] = Form.useForm();
  const dispatch = useDispatch()
  const onFinishHandler = useCallback(
    async (values) => {
      const { confirm, ...user } = values;
      console.log(user);
    await  registerUser(user);
      console.log("sul", isSuccessful)

      
    },

    [registerUser]
  );
    if(isSuccessful)
    {
        dispatch({type: REDIRECT, isSuccessful})
        return <Redirect to="/login"/>
    }
  return (
    <section class="flex flex-col items-center h-screen md:flex-row">
      <div class="container mx-auto">
        <div class="flex justify-center px-2 py-6 ">
          <div class="flex w-full rounded-lg xl:w-3/4 lg:w-11/12 lg:shadow-xl ">
            <div class="relative hidden w-full h-auto bg-white bg-cover border-r rounded-l-lg lg:block lg:w-6/12">
              <div class="relative z-10 m-12 text-left ">
                <a class="flex items-center w-32 mb-4 font-medium text-blueGray-900 title-font md:mb-10">
                  <div class="w-2 h-2 p-2 mr-2 rounded-full bg-gradient-to-tr from-blue-300 to-blue-600"></div>
                  <h2 class="text-lg font-bold tracking-tighter text-black uppercase transition duration-500 ease-in-out transform hover:text-lightBlack-500 dark:text-lightBlue-400">
                    {' '}
                    Staye
                  </h2>
                </a>
                <h2 class="mt-12 mb-2 text-2xl font-semibold tracking-tighter text-black sm:text-3xl title-font">
                  {' '}
                  Create an account.{' '}
                </h2>
                <div class="w-full mt-16 mb-8 text-base leading-relaxed text-blueGray-900 sm:md:w-3/3 lg:text-1xl ">
                  {' '}
                  All you have to do is choose the section you need, remove the
                  one that you do not need for that project and paste the one
                  you need in that moment. All the section have been given the
                  same left/right padding. Because consistence is king.{' '}
                </div>
              </div>
            </div>
            <div class="w-full px-8 py-24 bg-white rounded-lg border-blueGray-100 lg:w-8/12 lg:px-24 lg:py-4 lg:rounded-l-none s">
              <div class="relative z-10 text-left ">
                <div class="flex justify-enter lg:py-6">
                  <button
                    type="button"
                    class="inline-flex w-full px-4 py-3 font-semibold text-black transition duration-500 ease-in-out transform bg-white border rounded-lg border-blueGray-300 hover:bg-black hover:text-white focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2"
                  >
                    <span class="ml-4"> Log in with Google </span>
                  </button>
                  <button
                    type="button"
                    class="inline-flex px-4 py-3 ml-8 font-semibold text-black transition duration-500 ease-in-out transform bg-white border rounded-lg border-blueGray-300 hover:bg-black focus:bg-blueGray-100 hover:text-black focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2"
                  >
                    <div class="flex items-center justify-center">
                      <svg
                        fill="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        class="w-5 h-5"
                        viewBox="0 0 24 24"
                      >
                        <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"></path>
                      </svg>
                    </div>
                  </button>
                </div>
                <Form
                  {...layout}
                  form={form}
                  name="register"
                  onFinish={onFinishHandler}
                >
                  <div>
                    <label class="block text-base font-medium leading-relaxed text-blueGray-700">
                      User Name
                    </label>
                    {/* <input
                      type="text"
                      name=""
                      id=""
                      placeholder="Your User Name "
                      class="w-full px-4 py-2 mt-2 text-base transition duration-500 ease-in-out transform border-transparent rounded-lg bg-gray-100 focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2 ext-black focus:border-blueGray-500"
                    /> */}
                    <Form.Item
                      name="name"
                      rules={[
                        {
                          required: true,
                          message: 'Please input your Username!',
                        },
                      ]}
                    >
                      <Input className="w-full px-4 py-2 my-2 text-base transition duration-500 ease-in-out transform border-transparent rounded-lg bg-gray-100 focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2 ext-black focus:border-blueGray-500" />
                    </Form.Item>
                  </div>
                  <div class="mt-4">
                    <label class="block text-base font-medium leading-relaxed text-blueGray-700">
                      Email Address
                    </label>
                    {/* <input
                      type="email"
                      name=""
                      id=""
                      placeholder="Your Email "
                      class="w-full px-4 py-2 mt-2 text-base transition duration-500 ease-in-out transform border-transparent rounded-lg bg-gray-100 focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2 ext-black focus:border-blueGray-500"
                      autocomplete=""
                      required=""
                    /> */}
                    <Form.Item
                      name="email"
                      rules={[
                        {
                          type: 'email',
                          message: 'The input is not valid E-mail!',
                        },
                        {
                          required: true,
                          message: 'Please input your E-mail!',
                        },
                      ]}
                    >
                      <Input className="w-full px-4 py-2 my-2 text-base transition duration-500 ease-in-out transform border-transparent rounded-lg bg-gray-100 focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2 ext-black focus:border-blueGray-500" />
                    </Form.Item>
                  </div>
                  <div class="flex flex-wrap mt-4 mb-6 -mx-3">
                    <div class="w-full px-3 mb-6 md:w-1/2 md:mb-0">
                      <label
                        class="text-base font-medium leading-relaxed text-blueGray-700"
                        for="password"
                        minlength="6"
                      >
                        {' '}
                        Password{' '}
                      </label>
                      {/* <input
                        class="block w-full px-4 py-2 mt-2 text-base text-black transition duration-500 ease-in-out transform border-transparent rounded-lg bg-gray-100 focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2 ext-black focus:border-blueGray-500"
                        id="password"
                        type="text"
                        placeholder="Your Password"
                      /> */}
                      <Form.Item
                        name="password"
                        rules={[
                          {
                            required: true,
                            message: 'Please input your password!',
                          },
                          {
                            min: 8,
                            message: 'Password must be minimum 8 characters',
                          },
                        ]}
                        hasFeedback
                      >
                        <Password className="w-full px-4 py-2 my-2 text-base transition duration-500 ease-in-out transform border-transparent rounded-lg bg-gray-100 focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2 ext-black focus:border-blueGray-500" />
                      </Form.Item>
                      {/* <p class="mt-1 text-xs italic text-black">
                        Please fill out this field.
                      </p> */}
                    </div>
                    <div class="w-full px-3 md:w-1/2">
                      <label
                        class="text-base font-medium leading-relaxed text-blueGray-700"
                        for="confirm"
                      >
                        {' '}
                        Confirm{' '}
                      </label>
                      {/* <input
                        class="block w-full px-4 py-2 mt-2 text-base text-black transition duration-500 ease-in-out transform border-transparent rounded-lg bg-gray-100 focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2 ext-black focus:border-blueGray-500 "
                        id="confirm"
                        type="text"
                        placeholder="Confirm"
                      /> */}
                      <Form.Item
                        name="confirm"
                        dependencies={['password']}
                        hasFeedback
                        rules={[
                          {
                            required: true,
                            message: 'Please confirm your password!',
                          },
                          ({ getFieldValue }) => ({
                            validator(_, value) {
                              if (
                                !value ||
                                getFieldValue('password') === value
                              ) {
                                return Promise.resolve();
                              }
                              return Promise.reject(
                                new Error(
                                  'The two passwords that you entered do not match!'
                                )
                              );
                            },
                          }),
                        ]}
                      >
                        <Password className="w-full px-4 py-2 my-2 text-base transition duration-500 ease-in-out transform border-transparent rounded-lg bg-gray-100 focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2 ext-black focus:border-blueGray-500" />
                      </Form.Item>
                    </div>
                  </div>
                  {/* <button
                    type="submit"
                    class="block w-full px-4 py-3 mt-6 font-semibold text-white transition duration-500 ease-in-out transform rounded-lg bg-gradient-to-r from-black hover:from-black to-black focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2 hover:to-black"
                  >
                    Submit
                  </button> */}

                  <Button
                    htmlType="submit"
                    className="h-12 flex items-center justify-center block w-full px-4 py-3 mt-6 font-semibold text-white transition duration-500 ease-in-out transform rounded-lg bg-gradient-to-r from-black hover:from-black to-black focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2 hover:to-black"
                  >
                    Register
                  </Button>
                </Form>
                <p class="mt-8 text-center">
                  Already have an account?{' '}
                  <a href="#" class="font-semibold text-black hover:text-black">
                    Sign In
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

Register.propTypes = {
  registerUser: PropTypes.func,
  isPending: PropTypes.bool,
  isSuccessful: PropTypes.bool.isRequired,
};
const mapStateToProps = createStructuredSelector({
  // isPending: makeSelectIsPending(),
  isSuccessful: makeSelectIsSuccessful()
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      registerUser: actions.register,
    },
    dispatch
  );
const withConnect = connect(mapStateToProps, mapDispatchToProps);
export default compose(withConnect)(Register);
