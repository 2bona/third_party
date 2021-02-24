<template functional> 
          <vue-countdown-timer
              @start_callback="listeners.startCallBack('event started')"
              @end_callback="listeners.endCallBack(props.index)"
            :start-time="props.minDate_"
            :end-time="new Date(props.item.preorder_value)"
            :interval="1000"
            :start-label="'Until start'"
            label-position="begin"
            :end-text="'Pre-Order Is Due'"
            :day-txt="'days'"
            :hour-txt="'hours'"
            :minutes-txt="'minutes'"
            :seconds-txt="'seconds'"
             :style="props.item.preorder && props.orderPage ? 'border-left: 5px solid orange': ''" 
          >
            <template
              slot="countdown"
              slot-scope="scope"
            >
              <v-chip
                class="mt-1 font-weight-bold body-2"
                small
                style="position:relative"
                :color="
                  listeners.checktimer(
                    scope.props.days,
                    scope.props.hours
                  ) && scope.props.minutes <= 1
                    ? 'red lighten-4'
                    : listeners.checktimer(
                        scope.props.days,
                        scope.props.hours
                      ) && scope.props.minutes <= 2
                    ? 'yellow lighten-4'
                    : 'grey lighten-2'
                "
                :class="
                      listeners.checktimer(
                        scope.props.days,
                        scope.props.hours
                      ) && scope.props.minutes <= 1
                    ? 'red--text text--darken-2'
                    : listeners.checktimer(
                        scope.props.days,
                        scope.props.hours
                      ) && scope.props.minutes <= 2
                    ? 'yellow--text text--darken-4'
                    : 'grey--text text--darken-2'
                "
              >
                <span
                  ><span v-if="props.item.preorder === 2">Now & 
              </span>  Pre-order ETA -
                  {{ scope.props.days }}:
                </span>
                <span
                  >{{ scope.props.hours }}:
                </span>
                <span
                  >{{ scope.props.minutes }}:
                </span>
                <span
                  >{{ scope.props.seconds }}
                </span>
              </v-chip>
            </template>
          </vue-countdown-timer>
</template>