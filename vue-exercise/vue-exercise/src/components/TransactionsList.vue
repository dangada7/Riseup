<template>
  <div class="lc_textDirection_rtl lc_grid_auto1frAuto">

      <!-- Filter  -->
      <div class="lc_margin_16px">
          <div class="lc_box_shadow lc_width_300px lc_padding_16px lc_fontSize_22px lc_height lc_scroller lc_textDirection_ltr lc_clickable lc_text_16px">

              <div class="lc_textDirection_rtl lc_padding_8px lc_borderBottom_gray lc_background_gold_hover"
                   :class="selectedBusinessName === null && 'lc_background_gray'"
                   @click="selectedBusinessName = null">
                  הכל
              </div>

              <div v-for="transaction in transactionArr"
                   @click="selectedBusinessName= transaction.businessName"
                   :class="selectedBusinessName=== transaction.businessName && 'lc_background_gray'"
                   class="lc_textDirection_rtl lc_padding_8px lc_borderBottom_gray lc_background_gold_hover">
                  {{transaction.businessName}}
              </div>

          </div>
      </div>

      <!-- transactions list -->
      <div>
          <div v-for="transaction in filterTransactionArr" class="lc_margin_16px">
              <div  class="lc_box_shadow lc_width_400px lc_center lc_textAlign_initial lc_padding_8px">

                  <!-- 1) businessName-->
                  <div>
                      <b> שם בית עסק: </b>
                      {{transaction.businessName}}
                  </div>

                  <!-- 2) transactionDate -->
                  <div>
                      <b>תאריך רכישה:</b>
                      {{transaction.transactionDate}}
                  </div>

                  <!-- 3) transactionAmount -->
                  <div>
                      <b>סכום:</b>
                      {{transaction.transactionAmount}}
                  </div>

              </div>
          </div>

      </div>

      <!-- Expense Limit -->
      <div class="lc_margin_16px">
          <div class="lc_box_shadow lc_width_300px lc_padding_16px lc_fontSize_22px">

              <!-- 1) current expenseLimit -->
              <div>
                  <b>הגבלת סכום:</b>
                  {{expenseLimit}}
              </div>

              <!-- 2) edit -->
              <div v-if="editExpenseLimit" >

                  <input v-model="inputExpenseLimit" class="lc_borderBottom_blue lc_width_100p lc_marginTop_8px">

                  <div @click="updateExpenseLimit " class="lc_textAlign_end lc_color_gray lc_marginTop_16px">
                      שמור
                  </div>
              </div>

              <!--  3) calculateRemainingAmount -->
              <div v-else>
                  <div :class="calculateRemainingAmount > 0 ? 'lc_color_green' : 'lc_color_red'">
                      <b>סכום שנותר: </b>
                      <div class="lc_textDirection_ltr lc_inline">
                          {{calculateRemainingAmount}}
                      </div>
                  </div>

                  <div @click="editExpenseLimit = true " class="lc_textAlign_end lc_color_gray lc_marginTop_16px">
                      ערוך
                  </div>
              </div>

          </div>
      </div>

  </div>
</template>

<script>
import { parseTransactions } from '../parser/transactionsParser';

export default {
    name: 'TransactionsList',
    data(){
        return {
            transactionArr : [],
            expenseLimit : 2000,
            inputExpenseLimit : 2000,
            editExpenseLimit : false,
            selectedBusinessName : null
        }
    },
    computed:{
        calculateRemainingAmount(){
            let totalExpense = 0
            this.transactionArr.forEach(transaction => {
                totalExpense +=transaction.transactionAmount
            })

            return (this.expenseLimit - totalExpense).toFixed(2)
        },
        filterTransactionArr(){
            if(this.selectedBusinessName == null){
                return this.transactionArr
            }

            return this.transactionArr.filter(transaction => {
                return transaction.businessName === this.selectedBusinessName
            })
        }
    },
    methods:{
        updateExpenseLimit(){
            this.editExpenseLimit = false
            this.expenseLimit = this.inputExpenseLimit
        }
    },
    created(){
        parseTransactions().then(transactionArr => {
            this.transactionArr = transactionArr
        })

    }
};
</script>

<style scoped lang="scss">

.lc_grid_auto1frAuto{
    display: grid;
    grid-template-columns: auto 1fr auto;
}

.lc_center{
    text-align: center;
    margin: auto;
}

.lc_inline{
    display: inline-block;
}

.lc_width_400px{
    width:  400px;
}

.lc_width_300px{
    width:  300px;
}

.lc_textAlign_initial{
    text-align: initial;
}


.lc_textAlign_end{
    text-align: end;
}

.lc_textDirection_rtl{
    direction: rtl;
}
.lc_textDirection_ltr{
    direction: ltr;
}

.lc_underline{
    border-bottom: 1px solid black;
}

.lc_box_shadow{
    box-shadow: 0 2px 4px 0 rgba(0,0,0,0.2);
}


.lc_padding_8px{
    padding: 8px;
}

.lc_padding_16px{
    padding: 16px;
}

.lc_margin_16px{
    margin: 16px;
}

.lc_borderBottom_blue{
    border-bottom: 2px solid cornflowerblue;
}

.lc_borderBottom_gray{
    border-bottom: 1px solid darkgray;
}


.lc_width_100p{
    width: 100%;
}


.lc_fontSize_22px{
    font-size: 22px;
}

.lc_color_green{
    color: darkseagreen;
}

.lc_color_red{
    color: indianred;
}
.lc_color_gray{
    color: darkgray;
}

.lc_marginTop_8px{
    margin-top: 8px;
}
.lc_marginTop_16px{
    margin-top: 16px;
}

.lc_height{
    height: 300px;
}

.lc_scroller{
    overflow-y: scroll;
}

.lc_clickable{
    cursor: pointer;
}

.lc_background_gray{
    background: lightgray;
}

.lc_background_gold_hover:hover{
    background: palegoldenrod;
}

.lc_text_16px{
    font-size: 16px;
}

</style>
