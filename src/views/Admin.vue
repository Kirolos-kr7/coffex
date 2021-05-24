<template>
  <div class="admin">
    <v-container class="">
      <h3>Welcome Admin</h3>
      <v-subheader>Subheader</v-subheader>
    </v-container>
    <v-container class="pa-0" fluid>
      <v-tabs v-model="tab" fixed-tabs elevation="" background-color="" dark>
        <v-tab> Products </v-tab>
        <v-tab> Orders </v-tab>
        <v-tab> Manage Admin </v-tab>
      </v-tabs>
    </v-container>

    <v-tabs-items v-model="tab">
      <v-tab-item>
        <v-container>
          <v-row>
            <v-col
              ><h3 style="text-align: center; white-space: nowrap">
                Total Products ({{ products.length }})
              </h3></v-col
            >
            <v-col>
              <v-btn
                style="margin: 0 auto; display: block"
                dark
                @click="newProduct.dialog = true"
              >
                <v-icon dark left>add</v-icon>
                <span>Add New Product</span>
              </v-btn>
            </v-col>
          </v-row>
        </v-container>
        <div>
          <v-data-table
            :headers="headers"
            :items="products"
            item-key="product"
            class="elevation-1 mt-12"
            :search="search"
          >
            <template v-slot:top>
              <v-row>
                <v-text-field
                  style="max-width: 95% !important"
                  class="mx-auto"
                  v-model="search"
                  clearable
                  label="Search Products"
                  prepend-icon="search"
                ></v-text-field>
              </v-row>
              <v-row justify="center">
                <v-dialog
                  v-model="editProduct.dialog"
                  fullscreen
                  hide-overlay
                  transition="dialog-bottom-transition"
                >
                  <v-card tile>
                    <v-toolbar dark>
                      <v-btn icon dark @click="close">
                        <v-icon>mdi-close</v-icon>
                      </v-btn>
                      <v-toolbar-title>Edit Product</v-toolbar-title>
                      <v-spacer></v-spacer>
                      <v-toolbar-items>
                        <v-btn dark text @click="updateProduct"> Save </v-btn>
                      </v-toolbar-items>
                    </v-toolbar>
                    <v-container class="my-5">
                      <v-img
                        src="../assets/coffeeAdd.svg"
                        width="300"
                        class="mx-auto mb-9"
                      ></v-img>

                      <v-row class="mx-3">
                        <v-col cols="12" sm="6" md="6" lg="4">
                          <v-text-field
                            label="Product Name *"
                            v-model="editProduct.productName"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" md="6" lg="4">
                          <v-select
                            v-model="editProduct.type"
                            label="Product Type"
                            :items="['bean', 'machine']"
                            :rules="rules.required"
                          ></v-select>
                        </v-col>
                        <v-col cols="12" sm="6" md="6" lg="4">
                          <v-text-field
                            label="Price (USD) *"
                            v-model="editProduct.price"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" md="6" lg="4">
                          <v-text-field
                            label="Discount (%)"
                            v-model="editProduct.discount"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" md="6" lg="4"
                          ><v-text-field
                            v-model="editProduct.stock"
                            label="Stock"
                            append-outer-icon="add"
                            @click:append-outer="increment"
                            prepend-icon="remove"
                            @click:prepend="decrement"
                          ></v-text-field
                        ></v-col>
                        <v-col
                          cols="12"
                          sm="6"
                          md="6"
                          lg="4"
                          v-if="!editProduct.productImage"
                        >
                          <v-file-input
                            v-model="editProduct.newProductImage"
                            show-size
                            counter
                            label="Product Image *"
                          ></v-file-input>
                        </v-col>
                      </v-row>
                      <v-row class="mx-3 my-4" v-if="editProduct.productImage">
                        <v-card width="300px">
                          <div class="subheader my-3 text-center">
                            Product Image
                          </div>
                          <v-img :src="editProduct.productImage"></v-img>
                          <v-card-actions>
                            <v-btn
                              dark
                              class="mx-auto"
                              @click="removeImage(editProduct)"
                              >Remove Image</v-btn
                            >
                          </v-card-actions>
                        </v-card>
                      </v-row>
                      <v-row class="mx-3">
                        <v-col>
                          <v-textarea
                            counter
                            auto-grow
                            rows="2"
                            label="Product Description *"
                            v-model="editProduct.description"
                          ></v-textarea>
                        </v-col>
                      </v-row>
                    </v-container>
                  </v-card>
                </v-dialog>
              </v-row>
              <v-dialog v-model="dialogDelete" max-width="500px">
                <v-card>
                  <v-card-title class="headline"
                    >Are you sure you want to delete this item?</v-card-title
                  >
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn text @click="closeDelete">Cancel</v-btn>
                    <v-btn color="red darken-1" text @click="deleteItemConfirm"
                      >OK</v-btn
                    >
                    <v-spacer></v-spacer>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </template>
            <template v-slot:item.actions="{ item }">
              <v-icon small class="mr-2" @click="editItem(item)">
                mdi-pencil
              </v-icon>
              <v-icon small class="mr-2" @click="deleteItem(item)">
                mdi-delete
              </v-icon>
              <v-icon small @click="popUp(item.id)"> mdi-open-in-new </v-icon>
            </template>
          </v-data-table>
        </div>

        <v-spacer></v-spacer>
      </v-tab-item>
      <v-tab-item> SHIIIIT </v-tab-item>
      <v-tab-item> SHIIIIT </v-tab-item>
    </v-tabs-items>

    <!-- <v-dialog v-model="adminDialoge" persistent width="500">
      <v-card>
        <v-card-title class="headline grey lighten-2">
          Admin Panel
        </v-card-title>
        <v-card-text class="py-4 px-8">
          <v-form ref="form" v-model="valid" lazy-validation>
            <v-text-field
              v-model="admin.name"
              :rules="nameRules"
              label="Your Username *"
            ></v-text-field>
            <v-text-field
              name="password"
              v-model="admin.password"
              label="Enter your password *"
              :append-icon="adminPassword ? 'visibility' : 'visibility_off'"
              :type="adminPassword ? 'password' : 'text'"
              @click:append="adminPassword = !adminPassword"
              @keydown.enter="submit"
              :rules="passwordRules"
            ></v-text-field>
          </v-form>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          
          <router-link to="/">
          
          <v-btn color="red" text"
            >Back to homepage</v-btn
          >
          
          </router-link>
          <v-btn color="secondary" dark text @click="submit">Submit</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>  -->

    <v-row justify="center">
      <v-dialog
        v-model="newProduct.dialog"
        fullscreen
        hide-overlay
        transition="dialog-bottom-transition"
      >
        <v-card tile>
          <v-toolbar dark>
            <v-btn icon dark @click="newProduct.dialog = false">
              <v-icon>mdi-close</v-icon>
            </v-btn>
            <v-toolbar-title>New Product</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-toolbar-items>
              <v-btn dark text @click="addNewProduct"> ADD </v-btn>
            </v-toolbar-items>
          </v-toolbar>
          <v-container class="my-5">
            <v-img
              src="../assets/coffeeAdd.svg"
              width="300"
              class="mx-auto mb-9"
            ></v-img>

            <v-row class="mx-3">
              <v-col cols="12" sm="6" md="6" lg="4">
                <v-text-field
                  label="Product Name *"
                  v-model="newProduct.productName"
                  :rules="rules.required"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="6" lg="4">
                <v-select
                  label="Product Type"
                  :items="['bean', 'machine']"
                  v-model="newProduct.type"
                  :rules="rules.required"
                ></v-select>
              </v-col>
              <v-col cols="12" sm="6" md="6" lg="4">
                <v-text-field
                  label="Price (USD) *"
                  v-model="newProduct.price"
                  :rules="rules.required"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="6" lg="4">
                <v-text-field
                  label="Discount (%)"
                  v-model="newProduct.discount"
                  :rules="rules.required"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="6" lg="4"
                ><v-text-field
                  label="Stock"
                  append-outer-icon="add"
                  @click:append-outer="increment"
                  prepend-icon="remove"
                  @click:prepend="decrement"
                  v-model="newProduct.stock"
                  :rules="rules.required"
                ></v-text-field
              ></v-col>
              <v-col cols="12" sm="6" md="6" lg="4">
                <v-file-input
                  show-size
                  counter
                  label="Product Image *"
                  v-model="newProduct.productImage"
                  :rules="rules.required"
                ></v-file-input>
              </v-col>
            </v-row>
            <v-row class="mx-3">
              <v-col>
                <v-textarea
                  counter
                  auto-grow
                  rows="2"
                  label="Product Description *"
                  v-model="newProduct.description"
                  :rules="rules.required"
                ></v-textarea>
              </v-col>
            </v-row>
          </v-container>
        </v-card>
      </v-dialog>
    </v-row>
    <v-snackbar v-model="snackbar" :timeout="1500">
      <span>{{ snackbarText }}</span>
      <v-btn class="ml-4" color="pink" text @click="snackbar = false">
        Close
      </v-btn>
    </v-snackbar>
  </div>
</template>

<script>
import { db, storage } from '../firebase'
export default {
  name: 'Admin',
  data() {
    return {
      tab: null,
      adminDialoge: true,
      valid: false,
      admin: {
        name: '',
        password: '',
      },
      rules: {
        required: [(value) => !!value || 'Required.'],
      },
      adminPassword: '',
      snackbar: false,
      snackbarText: '',
      products: [],
      search: '',
      newProduct: {
        dialog: false,
        productName: '',
        type: '',
        price: '',
        stock: 0,
        discount: 0,
        productImage: null,
        description: '',
      },
      editProduct: {
        dialog: false,
        productName: '',
        type: '',
        productImage: null,
        newProductImage: null,
        price: 0,
        stock: 0,
        discount: 0,
        description: '',
        id: '',
      },
      dialogDelete: false,
      toDelete: '',
    }
  },
  computed: {
    headers() {
      return [
        {
          text: 'Name',
          align: 'start',
          value: 'productName',
        },
        {
          text: 'Price (USD)',
          align: 'start',
          value: 'price',
        },
        {
          text: 'Stock (n)',
          align: 'start',
          value: 'stock',
        },
        {
          text: 'Discount (%)',
          align: 'start',
          value: 'discount',
        },
        { text: 'Actions', value: 'actions', sortable: false },
      ]
    },
  },
  methods: {
    submit() {
      this.$refs.form.validate()
      if (this.valid == true) {
        if (this.admin.name === 'kirolos' && this.admin.password === '1234') {
          this.snackbarText = 'Successfully logged in'
          this.adminDialoge = false
          this.snackbar = true
        } else {
          this.snackbarText = 'Wrong username and/or password'
          this.snackbar = true
        }
      }
    },
    shortDescription(str) {
      return str.slice(0, 45) + ' ...'
    },

    increment() {
      this.newProduct.stock++
    },

    decrement() {
      this.newProduct.stock--
    },

    editItem(product) {
      this.editProduct.productName = product.productName
      this.editProduct.type = product.type
      this.editProduct.productImage = product.productImage
      this.editProduct.price = product.price
      this.editProduct.stock = product.stock
      this.editProduct.discount = product.discount
      this.editProduct.description = product.description
      this.editProduct.id = product.id
      this.editProduct.dialog = true
    },

    deleteItem(item) {
      this.toDelete = item
      this.dialogDelete = true
    },

    deleteItemConfirm() {
      db.collection('products')
        .doc(this.toDelete.id)
        .delete()
        .then(() => {
          if (this.toDelete.productImage) {
            storage.refFromURL(this.toDelete.productImage).delete()
          }
        })
        .then(() => {
          this.snackbarText = 'DELETED SUCCESSFULLY'
          this.snackbar = true
        })
        .catch((err) => {
          console.error(err)
        })
      this.closeDelete()
    },

    close() {
      this.editProduct.dialog = false
    },

    closeDelete() {
      this.dialogDelete = false
    },

    popUp(id) {
      window.open('./product/' + id, '_blank')
    },

    addNewProduct() {
      let docRef = db.collection('products').doc()
      storage
        .ref('productImage/' + this.newProduct.productImage.name)
        .put(this.newProduct.productImage)
        .then((res) => {
          res.ref.getDownloadURL().then((URL) => {
            docRef
              .set({
                productName: this.newProduct.productName,
                type: this.newProduct.type,
                productImage: URL,
                price: parseFloat(this.newProduct.price),
                discount: parseFloat(this.newProduct.discount),
                stock: parseInt(this.newProduct.stock),
                description: this.newProduct.description,
              })
              .then(() => {
                this.newProduct.productName = ''
                this.newProduct.type = ''
                this.newProduct.productImage = null
                this.newProduct.price = 0
                this.newProduct.discount = 0
                this.newProduct.stock = 0
                this.newProduct.description = ''
                this.newProduct.dialog = false
                this.snackbarText = 'ADDED SUCCESSFULLY'
                this.snackbar = true
              })
              .catch((err) => {
                console.log(err)
              })
          })
        })
    },

    removeImage(product) {
      db.collection('products')
        .doc(product.id)
        .update({
          productImage: null,
        })
        .then(() => {
          storage.refFromURL(product.productImage).delete()
        })
        .then(() => {
          this.snackbarText = 'REMOVED SUCCESSFULLY'
          this.snackbar = true
        })
        .catch((err) => {
          console.error(err)
        })
    },

    updateProduct() {
      if (this.editProduct.productImage) {
        db.collection('products')
          .doc(this.editProduct.id)
          .update({
            productName: this.editProduct.productName,
            type: this.editProduct.type,
            productImage: this.editProduct.productImage,
            price: parseFloat(this.editProduct.price),
            discount: parseFloat(this.editProduct.discount),
            stock: parseInt(this.editProduct.stock),
            description: this.editProduct.description,
          })
          .then(() => {
            this.snackbarText = 'UPDATED SUCCESSFULLY'
            this.snackbar = true
          })
          .catch((err) => {
            console.error(err)
          })
      } else {
        console.log(this.editProduct.newProductImage.name)
        storage
          .ref('productImage/' + this.editProduct.newProductImage.name)
          .put(this.editProduct.productImage)
          .then((res) => {
            res.ref.getDownloadURL().then(() => {
              db.collection('products')
                .doc(this.editProduct.id)
                .update({
                  productName: this.editProduct.productName,
                  type: this.editProduct.type,
                  productImage: this.editProduct.newProductImage,
                  price: parseFloat(this.editProduct.price),
                  discount: parseFloat(this.editProduct.discount),
                  stock: parseInt(this.editProduct.stock),
                  description: this.editProduct.description,
                })
                .then(() => {
                  this.snackbarText = 'UPDATED SUCCESSFULLY'
                  this.snackbar = true
                })
                .catch((err) => {
                  console.error(err)
                })
            })
          })
      }
    },
  },
  firestore: {
    products: db.collection('products'),
  },
  mounted() {
    this.valid = false
  },
}
</script>

<style lang="scss" scoped>
@media (max-width: 800px) {
  .products-row {
    justify-content: center;
    display: grid;
  }
}

@media (max-width: 600px) {
  .top-bar {
    justify-content: center;
    display: grid;
  }
}
</style>
