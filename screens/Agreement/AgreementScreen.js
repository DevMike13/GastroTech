import { View, Text, SafeAreaView, Image, TouchableOpacity, ScrollView } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient';

import styles from './agreement.style';

const AgreementScreen = ({ navigation }) => {

    const handleGoToLogin = () => {
        navigation.goBack();
    };

  return (
    <SafeAreaView style={styles.container}>
        <ScrollView style={{ height: '100%'}}>
            <LinearGradient
                colors={['#11774e', '#14b045', '#0c403b']}
                locations={[0, 0.4, 1]}
                style={styles.gradientBackground}
            >
                <Text style={styles.mainTitleText}>Non-Disclosure Agreement</Text>
                <Text style={styles.headingText}>
                    This Non-Disclosure Agreement
                    ("Agreement") is made between [Nathaniel Gamboa, Fesariton Jerome, and Ken Ingco]
                    ("Disclosing Party"), researchers for capstone project
                    and [Developer's] ("Receiving Party") as of
                    [Date]. The Disclosing Party intends to
                    share certain confidential and proprietary
                    information related to the development of
                    the GastroTech application, including but
                    not limited to technical specifications,
                    designs, user data, and
                    other sensitive information ("Confidential
                    Information").
                </Text>
                <Text style={styles.titleText}>
                    1. Purpose
                </Text>
                <Text style={styles.contentText}>
                    The purpose of this Agreement is to
                    protect the confidentiality of the
                    Confidential Information, which is disclosed
                    in connection with the development,
                    testing, and deployment of the GastroTech
                    application, a smart fire and gas detection
                    system designed for use in restaurants and
                    other commercial establishments.
                </Text>

                <Text style={styles.titleText}>
                    2. Confidentiality Obligations
                    The Receiving Party agrees to:

                </Text>
                <Text style={styles.contentText}>
                    Maintain the confidentiality of the
                    Confidential Information and not disclose it
                    to any third parties without the prior
                    written consent of the Disclosing Party.
                    Use the Confidential Information solely for
                    the purpose of developing the GastroTech
                    application and not for any other purpose.
                    Take all reasonable precautions to protect
                    the confidentiality of the Confidential
                    Information, including but not limited to
                    implementing appropriate security
                    measures and limiting access to the
                    information to employees or
                    subcontractors who have a legitimate need
                    to know.
                </Text>

                <Text style={styles.titleText}>
                    3. Exclusions
                </Text>
                <Text style={styles.titleText}>
                    This Agreement does not apply to
                    information that:
                </Text>
                <Text style={styles.contentText}>
                    Was already in the Receiving Party's
                    possession before it was received from the
                    Disclosing Party;
                    Is or becomes publicly available through no
                    fault of the Receiving Party;
                    Is disclosed to the Receiving Party by a
                    third party who has the right to disclose
                    such information;
                    Is independently developed by the
                    Receiving Party without the use of the
                    Confidential Information.
                </Text>

                <Text style={styles.titleText}>
                    4. Return of Materials
                </Text>
                <Text style={styles.contentText}>
                    Upon the termination of this Agreement or
                    upon the Disclosing Party's request, the
                    Receiving Party agrees to promptly return
                    or destroy all materials containing
                    Confidential Information, including all
                    copies, notes, and summaries thereof.
                </Text>

                <Text style={styles.titleText}>
                    5. Term
                </Text>
                <Text style={styles.contentText}>
                    The confidentiality obligations under this
                    Agreement shall continue for a period of
                    [Insert Number] years from the date of
                    disclosure of the Confidential Information.
                </Text>

                <Text style={styles.titleText}>
                    6. Remedies
                </Text>
                <Text style={styles.contentText}>
                    The Receiving Party acknowledges that any
                    breach of this Agreement may result in
                    irreparable harm to the Disclosing Party,
                    and agrees that in the event of such a
                    breach, the Disclosing Party shall be
                    entitled to seek injunctive relief in addition
                    to any other remedies available at law or in
                    equity.
                </Text>

                <Text style={styles.titleText}>
                    7. Governing Law
                </Text>
                <Text style={styles.contentText}>
                    This Agreement shall be governed by and
                    construed in accordance with the laws of
                    [Insert Jurisdiction].
                </Text>

                <Text style={styles.titleText}>
                    8. Entire Agreement
                </Text>
                <Text style={styles.contentText}>
                    This Agreement constitutes the entire
                    agreement between the parties with
                    respect to the subject matter hereof and
                    supersedes all prior agreements and
                    understandings, whether written or oral,
                    relating to such subject matter.
                </Text>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.buttonStyle} onPress={handleGoToLogin}>
                        <Text style={styles.buttonText}>Back</Text>
                    </TouchableOpacity>
                </View>
            </LinearGradient>
        </ScrollView>
    </SafeAreaView>
  )
}

export default AgreementScreen