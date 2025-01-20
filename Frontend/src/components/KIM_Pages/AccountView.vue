<template>
    <div class="container">
        <div class="card">
            <div class="card-body">
                <h3 class="card-title">Manage your account</h3>
                
                <h1>Your account details</h1>
                <p class="text-muted">Click here to edit your information</p>
                
                <h4>Account details</h4>
                
                <div class="row">
                <div class="column">
                    <div class="inner-card">
                    <div class="inner-card-body">
                        <h5>PERSONAL</h5>
                        <div class="info-group">
                        <label>EMAIL:</label>
                        <span>laurentiu@hogash.com</span>
                        </div>
                        <div class="info-group">
                        <label>USERNAME:</label>
                        <span>Bobo</span>
                        </div>
                        <div class="info-group">
                        <label>DISPLAY NAME:</label>
                        <span></span>
                        </div>
                    </div>
                    </div>
                </div>
                
                <div class="column">
                    <div class="inner-card">
                    <div class="inner-card-body">
                        <h5>CUSTOMER HISTORY</h5>
                        <div class="info-group">
                        <label>CUSTOMER SINCE:</label>
                        <span>Apr 2020</span>
                        </div>
                        <div class="info-group">
                        <label>COMPLETED PURCHASES:</label>
                        <span>0</span>
                        </div>
                        <div class="info-group">
                        <label>VALUE OF PURCHASES:</label>
                        <span>0</span>
                        </div>
                    </div>
                    </div>
                </div>
                </div>

                <div class="access-passes">
                <h4>Access passes</h4>
                <p>Congratulations! You are an Access Pass holder. You can download multiple extensions from one location.</p>
                <button class="btn-theme">VIEW YOUR DOWNLOADS!</button>
                </div>
            </div>
        </div>
    </div>
    <footer-bar></footer-bar>
  </template>
  
  <style>
  
  .container {
  max-width: 1200px;
  margin: 2rem auto;
  padding: 0 1rem;
}

.card {
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.card-body {
  padding: 2rem;
}

.card-title {
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 1rem;
}

h1 {
  font-size: 2rem;
  font-weight: 700;
  margin: 1.5rem 0 0.5rem;
}

h4 {
  font-size: 1.25rem;
  font-weight: 600;
  margin: 2rem 0 1rem;
}

h5 {
  font-size: 1rem;
  font-weight: 600;
  margin-bottom: 1rem;
}

.text-muted {
  color: #6c757d;
}

.row {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;
  margin-top: 1rem;
}

@media (min-width: 768px) {
  .row {
    grid-template-columns: 1fr 1fr;
  }
}

.inner-card {
  background: white;
  border: 1px solid #e9ecef;
  border-radius: 6px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
}

.inner-card-body {
  padding: 1.5rem;
}

.info-group {
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
}

.info-group:last-child {
  margin-bottom: 0;
}

.info-group label {
  font-weight: 600;
  min-width: 150px;
}

.info-group span {
  margin-left: 0.5rem;
  color: #495057;
}

.access-passes {
  margin-top: 2rem;
}

.access-passes p {
  margin: 1rem 0;
  color: #495057;
}

.btn-theme {
  background-color: #0d6efd;
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  font-weight: 600;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.2s;
}

.btn-theme:hover {
  background-color: #0b5ed7;
}
  </style>
  