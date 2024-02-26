import { PageUtilities } from '@cryptobigbang-core';
import { DurationType, NotificationPriority } from '@cryptobigbang-enums';


const NotificationDefinitionBase = () => {
    const {translate} = PageUtilities();   

    const optionDurationTypeList = [
        { value: DurationType.Day, label: translate("common.durationType.day") },
        { value: DurationType.Hour, label: translate("common.durationType.hour") },
        { value: DurationType.Minute, label: translate("common.durationType.minute") },
        { value: DurationType.Month, label: translate("common.durationType.month") },
        { value: DurationType.Second, label: translate("common.durationType.second") },
        { value: DurationType.Week, label: translate("common.durationType.week") },
        { value: DurationType.Year, label: translate("common.durationType.year") }
    ]

    const optionNotificationPriorityList = [
        { value: NotificationPriority.High, label: translate("notificationDefinitionPage.notificationPriorityHigh") },
        { value: NotificationPriority.Low, label: translate("notificationDefinitionPage.notificationPriorityLow") },
        { value: NotificationPriority.Medium, label: translate("notificationDefinitionPage.notificationPriorityMedium") },
        { value: NotificationPriority.Urgent, label: translate("notificationDefinitionPage.notificationPriorityUrgent") }

    ]

    return {
        optionDurationTypeList,
        optionNotificationPriorityList
    }
}
export default NotificationDefinitionBase;
