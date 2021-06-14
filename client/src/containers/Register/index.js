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
    await  registerUser(user);
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
              <div class="relative text-left ">
              <img
          src="https://images.unsplash.com/photo-1552733407-5d5c46c3bb3b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8NXx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60"
          alt=""
          
        />
               
                <div class="w-full mt-16 mb-8 text-base leading-relaxed text-blueGray-900 sm:md:w-3/3 lg:text-1xl ">
                 
                </div>
              </div>
            </div>
            <div class="w-full px-8 py-24 bg-white rounded-lg border-blueGray-100 lg:w-8/12 lg:px-24 lg:py-4 lg:rounded-l-none s">
              <div class="relative z-10 text-left ">
              <h1 class="ml-20 mb-20 text-black-800 text-4xl font-medium">Create an account </h1>
              
                <Form
                  {...layout}
                  form={form}
                  name="register"
                  onFinish={onFinishHandler}
                  
                >
                  <div>
                    <label class="block text-base font-medium text-gray-800 dark:text-gray-400">
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
                      <Input className="w-full px-4 py-2 my-2 text-base transition duration-500 ease-in-out transform border-transparent rounded-lg bg-gray-100 focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2 ext-black focus:border-blueGray-500" 
                      placeholder="User Name"/>
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
                      <Input className="w-full px-4 py-2 my-2 text-base transition duration-500 ease-in-out transform border-transparent rounded-lg bg-gray-100 focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2 ext-black focus:border-blueGray-500" 
                      placeholder="Email"/>
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
                        <Password className="w-full px-4 py-2 my-2 text-base transition duration-500 ease-in-out transform border-transparent rounded-lg bg-gray-100 focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2 ext-black focus:border-blueGray-500"
                        placeholder="Password" />
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
                        <Password className="w-full px-4 py-2 my-2 text-base transition duration-500 ease-in-out transform border-transparent rounded-lg bg-gray-100 focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2 ext-black focus:border-blueGray-500"
                        placeholder="Cofirm Password" />
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
                  <a href="/login" class="font-medium text-blue-800 dark:text-gray-200 hover:underline">
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
