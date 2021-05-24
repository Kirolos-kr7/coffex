<template>
  <nav>
    <v-overlay class="menuState hidden">
      <div class="overlay" ref="overlay">
        <ul class="overlayMenu">
          <li><router-link to="/">HOME</router-link></li>
          <li><router-link to="/store">STORE</router-link></li>
          <li><router-link to="/cat/bean">BEANS</router-link></li>
          <li><router-link to="/cat/machine">MACHINES</router-link></li>
          <li><router-link to="/about">ABOUT</router-link></li>
        </ul>
      </div>
    </v-overlay>
    <v-app-bar app flat height="105" :color="color">
      <v-container class="navContainer">
        <v-row class="rowA" ref="rowA">
          <div class="optionBtns d-flex">
            <v-btn
              small
              class="burger mr-1"
              color="transparent"
              depressed
              @click="menuStatus"
            >
              <v-icon color="">menu</v-icon>
            </v-btn>
            <v-btn
              class="regBtn"
              small
              depressed
              color="transparent"
              @click="logInDialog = true"
            >
              <v-icon>login</v-icon>
              <span class="logInText ml-2">logIn</span>
            </v-btn>
          </div>
          <router-link to="/">
            <h1>Coffex</h1>
          </router-link>
          <div class="optionBtns d-flex">
            <Search />
            <router-link to="/cart">
              <v-btn class="cart" color="transparent" small depressed>
                <v-icon>shopping_cart</v-icon>
                <v-chip x-small class="inCart">
                  {{ $store.state.cartCount }}
                </v-chip>
              </v-btn>
            </router-link>
          </div>
        </v-row>
        <v-row class="rowB" ref="menuRow">
          <ul class="menu">
            <li><router-link to="/">HOME</router-link></li>
            <li><router-link to="/store">STORE</router-link></li>
            <li><router-link to="/cat/bean">BEANS</router-link></li>
            <li><router-link to="/cat/machine">MACHINES</router-link></li>
            <li><router-link to="/about">ABOUT</router-link></li>
          </ul>
        </v-row>
      </v-container>
      <v-dialog v-model="logInDialog" width="500">
        <v-card>
          <v-card-title class="headline grey lighten-2"> Log In </v-card-title>
          <v-card-text class="py-4 px-8">
            <v-form ref="form" v-model="valid" lazy-validation>
              <v-text-field
                v-model="logIn.name"
                :rules="nameRules"
                label="Your Name *"
                required
              ></v-text-field>
              <v-text-field
                name="password"
                label="Enter your password *"
                hint="At least 8 characters"
                min="8"
                :append-icon="logInPassword ? 'visibility' : 'visibility_off'"
                :logInPassword="logIn.password"
                :type="logInPassword ? 'password' : 'text'"
                @click:append="logInPassword = !logInPassword"
                :rules="passwordRules"
              ></v-text-field>
              <a
                @click="
                  logInDialog = false
                  signUpDialog = true
                "
                >Not Signed Up Yet?</a
              >
            </v-form>
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="red" text @click="logInDialog = false">Close</v-btn>
            <v-btn color="secondary" dark text @click.prevent="submit"
              >Submit</v-btn
            >
          </v-card-actions>
        </v-card>
      </v-dialog>
      <v-dialog v-model="signUpDialog" width="500">
        <v-card>
          <v-card-title class="headline grey lighten-2"> Sign Up </v-card-title>
          <v-card-text class="py-4 px-8">
            <v-form ref="form" v-model="valid" lazy-validation>
              <v-text-field
                v-model="signUp.name"
                :rules="nameRules"
                label="Your Name *"
                required
              ></v-text-field>
              <v-text-field
                label="Your E-mail *"
                v-model="signUp.email"
                :rules="emailRules"
              ></v-text-field>
              <v-text-field
                name="password"
                label="Enter your password *"
                hint="At least 8 characters"
                min="8"
                :append-icon="signUpPassword0 ? 'visibility' : 'visibility_off'"
                :append-icon-cb="(e) => (signUpPassword0 = !signUpPassword0)"
                :value="signUp.password0"
                :type="signUpPassword0 ? 'password' : 'text'"
                :rules="passwordRules"
                @click:append="signUpPassword0 = !signUpPassword0"
              ></v-text-field>
              <v-text-field
                name="password"
                label="Reenter your password *"
                hint="Make sure passwords match"
                min="8"
                :append-icon="signUpPassword1 ? 'visibility' : 'visibility_off'"
                :append-icon-cb="(e) => (signUpPassword1 = !signUpPassword1)"
                :value="signUp.password1"
                :type="signUpPassword1 ? 'password' : 'text'"
                :rules="passwordRules"
                @click:append="signUpPassword1 = !signUpPassword1"
              ></v-text-field>
              <a
                @click="
                  logInDialog = true
                  signUpDialog = false
                "
                >Already Signed Up?</a
              >
            </v-form>
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="red" text @click="signUpDialog = false">Close</v-btn>
            <v-btn color="secondary" dark text @click.prevent="submit"
              >Submit</v-btn
            >
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-app-bar>
  </nav>
</template>

<script>
import Search from '../components/Search'
export default {
  name: 'HeaderNav',
  data() {
    return {
      color: '#ff000000',
      menuVisibility: false,
      signUpDialog: false,
      logInDialog: false,
      valid: false,
      validation: false,
      logIn: {
        name: '',
        password: '',
      },
      signUp: {
        name: '',
        email: '',
        password0: '',
        password1: '',
      },
      nameRules: [
        (v) => !!v || 'Name is required',
        (v) => v.length <= 15 || 'Name must be less than 15 characters',
      ],
      emailRules: [
        (v) => !!v || 'E-mail is required',
        (v) => /.+@.+\..+/.test(v) || 'E-mail must be valid',
      ],
      passwordRules: [
        (v) => !!v || 'Password is required',
        this.signUpPassword0 === this.signUpPassword1 || 'Password must match',
      ],
      logInPassword: '',
      signUpPassword0: '',
      signUpPassword1: '',
    }
  },
  components: {
    Search,
  },
  methods: {
    submit() {
      this.$refs.form.validate()
    },
    menuStatus() {
      if (document.querySelector('.menuState').classList.contains('hidden')) {
        document.querySelector('.menuState').classList.remove('hidden')
        document.documentElement.style.overflowY = 'hidden'
      } else {
        document.querySelector('.menuState').classList.add('hidden')
        document.documentElement.style.overflowY = 'overlay'
      }
    },
  },
  mounted() {
    document.documentElement.style.overflowY = 'overlay'
    this.$store.commit('getCart')
    if (this.$route.name == 'Home') {
      this.color = '#00000000'
      this.$refs.overlay.style.backgroundColor = '#cda875'
    } else {
      this.color = '#f3f3f3'
      this.$refs.overlay.style.backgroundColor = '#c4c4cd'
    }
    if (
      localStorage.getItem('cart') === null ||
      localStorage.getItem('cart') === ''
    ) {
      localStorage.setItem('cart', JSON.stringify([]))
    }
  },
}
</script>

<style lang="scss" scoped>
.v-main {
  padding: 0 !important;
}
header {
  transition: all 0.2s ease 0s;
}
.navContainer {
  display: flex;
  flex-wrap: wrap;
  padding: 0;
  .row {
    width: 100%;
    place-content: center;
    margin: 0;
    transition: 0.2s all ease-in-out;
  }
  .rowA {
    justify-content: space-between;
    align-items: center;
    height: 65px;
    position: relative;
    h1 {
      font-family: 'Pacifico', cursive;
      position: absolute;
      top: 45%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
    .inCart {
      background: transparent;
      padding: 3.5px 4px 3px;
      font-size: 10px;
      font-weight: 600;
      cursor: pointer;
    }
  }
  .rowB {
    height: 40px;
    transform: translateY(-5px);
  }
  ul.menu {
    list-style: none;
    margin: 0;
    padding: 0;
    text-align: right;
    li,
    .regBtn {
      display: inline-block;
      margin: 15px;
      a {
        color: #000000;
        text-decoration: none;
        padding: 1px 1px;
        transition: 0.2s all cubic-bezier(0.175, 0.885, 0.32, 1.275);
        &:hover {
          color: #666;
        }
      }
    }
  }
}
.burger {
  display: none;
}

@media screen and (max-width: 630px) {
  .logInText {
    display: none;
  }
  .burger {
    display: block;
  }
  ul.menu {
    display: none;
  }
  .rowB {
    display: none;
  }
}

.overlay {
  display: flex;
  justify-content: center;
  align-items: center;
  background: url('../assets/Leaves.png') center center no-repeat;
  background-blend-mode: color-dodge;
  background-size: cover;
  background-color: #cda875;
  width: 100vw;
  height: 100vh;
  visibility: visible;
  opacity: 1;
  transition: visibility 0s, opacity 0.5s linear;
  .overlayMenu {
    list-style: none;
    padding: 0;
    li {
      font-size: 24px;
      text-align: center;
      margin-top: 15px;
    }
  }
}
.hidden {
  visibility: hidden;
  opacity: 0;
  pointer-events: none;
}
</style>

