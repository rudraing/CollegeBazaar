import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../Logo';

function Footer() {
  return (
    <section className="relative bg-amber-500 border-t-2 border-t-black py-10">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-wrap -m-6">
          {/* Logo and Copyright */}
          <div className="w-full md:w-1/2 lg:w-5/12 p-6">
            <div className="flex flex-col h-full justify-between">
              <div className="mb-4">
                <Logo width="100px" />
              </div>
              <div>
                <p className="text-sm text-teal-100">
                  &copy; Copyright 2023. All Rights Reserved by DevUI.
                </p>
              </div>
            </div>
          </div>

          {/* Company Links */}
          <div className="w-full md:w-1/2 lg:w-2/12 p-6">
            <div className="h-full">
              <h3 className="text-xs font-semibold uppercase text-teal-100 mb-4">
                Company
              </h3>
              <ul>
                <li className="mb-2">
                  <Link
                    to="/"
                    className="text-base font-medium text-teal-100 hover:text-gray-700"
                  >
                    Features
                  </Link>
                </li>
                <li className="mb-2">
                  <Link
                    to="/"
                    className="text-base font-medium text-teal-100 hover:text-gray-700"
                  >
                    Pricing
                  </Link>
                </li>
                <li className="mb-2">
                  <Link
                    to="/"
                    className="text-base font-medium text-teal-100 hover:text-gray-700"
                  >
                    Affiliate Program
                  </Link>
                </li>
                <li>
                  <Link
                    to="/"
                    className="text-base font-medium text-teal-100 hover:text-gray-700"
                  >
                    Press Kit
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Support Links */}
          <div className="w-full md:w-1/2 lg:w-2/12 p-6">
            <div className="h-full">
              <h3 className="text-xs font-semibold uppercase text-teal-100 mb-4">
                Support
              </h3>
              <ul>
                <li className="mb-2">
                  <Link
                    to="/"
                    className="text-base font-medium text-teal-100 hover:text-gray-900"
                  >
                    Account
                  </Link>
                </li>
                <li className="mb-2">
                  <Link
                    to="/"
                    className="text-base font-medium text-teal-100 hover:text-gray-900"
                  >
                    Help
                  </Link>
                </li>
                <li className="mb-2">
                  <Link
                    to="/"
                    className="text-base font-medium text-teal-100 hover:text-gray-900"
                  >
                    Contact Us
                  </Link>
                </li>
                <li>
                  <Link
                    to="/"
                    className="text-base font-medium text-teal-100 hover:text-gray-900"
                  >
                    Customer Support
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Legal Links */}
          <div className="w-full md:w-1/2 lg:w-3/12 p-6">
            <div className="h-full">
              <h3 className="text-xs font-semibold uppercase text-teal-100 mb-4">
                Legals
              </h3>
              <ul>
                <li className="mb-2">
                  <Link
                    to="/"
                    className="text-base font-medium text-teal-100 hover:text-gray-900"
                  >
                    Terms &amp; Conditions
                  </Link>
                </li>
                <li className="mb-2">
                  <Link
                    to="/"
                    className="text-base font-medium text-teal-100 hover:text-gray-900"
                  >
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link
                    to="/"
                    className="text-base font-medium text-teal-100 hover:text-gray-900"
                  >
                    Licensing
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Footer;
