/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function () {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function () {
        document.addEventListener('deviceready', function () {
            var HandleIntent = function (Intent) {
                console.log(intent);
                // With intent you'll do almost everything 
                document.querySelector("#test").innerHTML = "URL was "+intent;

                if (Intent.hasOwnProperty('data')) {
                    // Do something with the File
                    document.querySelector("#test").innerHTML = "data was "+intent;
                } else {
                    // this will happen in getCordovaIntent when the app starts and there's no
                    // active intent
                    console.log("The app was opened manually and there's not file to open");
                }
            };

            // Handle the intent when the app is open
            // If the app is running in the background, this function
            // will handle the opened file
            window.plugins.intent.setNewIntentHandler(HandleIntent);

            // Handle the intent when the app is not open
            // This will be executed only when the app starts or wasn't active
            // in the background
            window.plugins.intent.getCordovaIntent(HandleIntent, function () {
                alert("Error: Cannot handle open with file intent");
            });
        }, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function () {
        app.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent: function (id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }
};
