
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';

const Signup = () => {
  const navigate = useNavigate();
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('9102004harshikas-projects/cue-ai-clientsignup', { fname, lname, email })
      .then(result => {
        alert("Created account successfully");
        const joinedDate = result.data.joinedDate;
        localStorage.setItem('joinedDate', new Date(joinedDate).toString());
        navigate('/login');
      })
      .catch(err => console.log(err));
  }

  return (
    <div className="min-h-screen py-9">
      <div className="container mx-auto">
        <div className="flex flex-col lg:flex-row w-10/12 lg:w-8/12 bg-[rgb(69,69,102)] rounded-xl mx-auto shadow-lg overflow-hidden">
          <div className="w-full lg:w-1/2 flex flex-col items-center justify-center p-12 bg-no-repeat bg-cover bg-center bg-[url('https://images.unsplash.com/photo-1515965885361-f1e0095517ea?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=3300&q=80')]"></div>
          <div className="w-full lg:w-1/2 py-16 px-12">
            <h2 className="text-3xl mb-4">Register</h2>
            <p className="mb-4">
              Create your account. It’s free and only takes a minute
            </p>
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-2 gap-5">
                <input
                  type="text"
                  onChange={(e) => setFname(e.target.value)}
                  required
                  placeholder="Firstname"
                  className="py-1 px-2 border-b border-slate-500 bg-[rgb(69,69,102)]"
                />
                <input
                  type="text"
                  onChange={(e) => setLname(e.target.value)}
                  required
                  placeholder="Surname"
                  className="py-1 px-2 border-b border-slate-500 bg-[rgb(69,69,102)]"
                />
              </div>
              <div className="mt-5">
                <input
                  type="email"
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="Email"
                  className="py-1 px-2 border-b border-slate-500 bg-[rgb(69,69,102)] w-full"
                />
              </div>
             
              
              <div className="mt-5">
                <input type="checkbox" className="border border-gray-400" />
                <span>
                  &nbsp;I accept the{" "}
                  <a
                    href="/terms"
                    className="bg-gradient-to-r from-[rgb(214,133,134)]  to-[rgb(219,194,144)] text-transparent  bg-clip-text font-semibold"
                    alt="Terms of Use"
                  >
                    Terms of Use
                  </a>{" "}
                  &{" "}
                  <a
                    href="/privacy-policy"
                    className="bg-gradient-to-r from-[rgb(214,133,134)]  to-[rgb(219,194,144)] text-transparent  bg-clip-text font-semibold"
                    alt="Privacy Policy"

                  >
                    Privacy Policy
                  </a>
                </span>
              </div>
              <div className="mt-5">
                <button className="w-full rounded-md bg-gradient-to-r from-[rgb(219,194,144)] to-[rgb(214,133,134)] text-slate-900 py-3 text-center">
                  Register Now 
                </button>
              </div>
            </form>
            <div className="text-center mt-4">
              <Link to={"/login"}>
                <a className="underline hover:underline text-blue-dark text-xs" href="/login">
                  already have an account?
                </a>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
