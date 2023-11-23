package com.authenticvision.android.nativescript

import android.R
import android.app.Activity
import android.content.Context
import android.content.Intent
import android.content.res.Resources.Theme
import android.graphics.Bitmap
import android.graphics.Color
import android.graphics.drawable.Drawable
import android.os.Build
import android.os.Bundle
import android.view.MenuItem
import androidx.core.graphics.drawable.toDrawable
import com.authenticvision.android.sdk.integration.IAvFlowDelegate
import com.authenticvision.android.sdk.integration.configs.AvBranding
import com.authenticvision.android.sdk.integration.configs.AvLocaleConfig
import com.authenticvision.android.sdk.integration.configs.AvSecurityPolicy
import com.authenticvision.android.sdk.integration.configs.AvScanConfig
import com.authenticvision.android.sdk.integration.dtos.AvScanResult
import com.authenticvision.android.sdk.integration.views.scan.AvScanActivity
import java.net.URL
import java.util.Locale

inline fun <reified T: Enum<T>> Intent.configEnum(key: String): T? =
        if (hasExtra(key)) enumValueOf<T>(getStringExtra(key)!!) else null

class ScanConfig(private val intent: Intent) : AvScanConfig() {

    override fun apiKey() = intent.getStringExtra("apiKey")

    override fun scanDesign() = intent.configEnum("scanDesign") ?: super.scanDesign()
    override fun labelLayout() = intent.configEnum("labelLayout") ?: super.labelLayout()

    override fun attestationMode() = intent.configEnum("attestationMode") ?: AvAttestationMode.NONE
    override fun attestationCert() = intent.getStringExtra("attestationCertificate")

    override fun isAcousticFeedbackEnabled(context: Context) =
            intent.getBooleanExtra("feedbackAcoustic", false)
    override fun isHapticFeedbackEnabled(context: Context) =
            intent.getBooleanExtra("feedbackHaptic", false)
    override fun isVisualFeedbackEnabled(context: Context) =
            intent.getBooleanExtra("feedbackVisual", false)

    // TODO: might make sense to have libavas or the SDK use the testing endpoint with a flag,
    //  so that endpoint lists do not need to be maintained in templates/wrappers.
    override fun testingEndpoints(): List<String>? =
            if (intent.getBooleanExtra("testingEnvironment", false))
                listOf("dauth-avas.avdev.at") else super.testingEndpoints()

    override fun localeConfig(): AvLocaleConfig {
        return object : AvLocaleConfig() {
            override fun locale() = run {
                if (intent.hasExtra("locale")) {
                    Locale(intent.getStringExtra("locale")!!)
                } else {
                    super.locale()
                }
            }
        }
    }

    override fun securityPolicy(): AvSecurityPolicy {
        return object : AvSecurityPolicy() {
            override fun isLocationDataSubmissionActive() = run {
                if (intent.hasExtra("geoLocation")) {
                    intent.getBooleanExtra("geoLocation", false)
                } else {
                    super.isLocationDataSubmissionActive()
                }
            }
        }
    }

}

class Branding(private val intent: Intent) : AvBranding() {

    override fun universalPrimary(context: Context): Int {
        val colorHex = intent.getStringExtra("brandingPrimaryColor")
        if (colorHex != null) {
            return Color.parseColor(colorHex)
        } else {
            return super.universalPrimary(context)
        }
    }

    override fun universalSecondary(context: Context): Int {
        val colorHex = intent.getStringExtra("brandingSecondaryColor")
        if (colorHex != null) {
            return Color.parseColor(colorHex)
        } else {
            return super.universalSecondary(context)
        }
    }

    override fun scanLogo(context: Context): Drawable {
        val bitmap = if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.TIRAMISU) {
            intent.getParcelableExtra("brandingScanLogoImage", Bitmap::class.java)
        } else {
            intent.getParcelableExtra("brandingScanLogoImage")
        }
        if (bitmap != null) {
            return bitmap.toDrawable(context.resources)
        } else {
            return super.scanLogo(context)
        }
    }

}

class ScanActivity : AvScanActivity(), IAvFlowDelegate {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        scanConfig = ScanConfig(intent)
        branding = Branding(intent)
    }

    override fun onStart() {
        super.onStart()
        enableReturnButton()
    }

    private fun enableReturnButton() {
        supportActionBar!!.setDisplayHomeAsUpEnabled(true)
        supportActionBar!!.setHomeButtonEnabled(true)
        supportActionBar!!.setDisplayShowHomeEnabled(true)
        supportActionBar!!.setDisplayShowTitleEnabled(false)
        supportActionBar!!.setIcon(null)
    }

    override fun onOptionsItemSelected(item: MenuItem): Boolean {
        val id = item.itemId
        if (id == R.id.home) {
            onBackPressed()
        }
        return super.onOptionsItemSelected(item)
    }

    override fun avScanDidCompleteWithResult(result: AvScanResult) {
        val data = Intent()

        data.putExtra("slid", result.slid)
        data.putExtra("sessionID", result.sessionId)
        result.attestationToken?.let { data.putExtra("attestationToken", it.toString()) }

        data.putExtra("authentic", result.isAuthentic)
        data.putExtra("authResult", result.authenticationResult.toString())

        data.putExtra("resultAction", result.resultAction.toString())
        result.resultUrl?.let { data.putExtra("resultURL", it.toString()) }

        data.putExtra("campaignAction", result.campaignAction.toString())
        result.campaignUrl?.let { data.putExtra("campaignURL", it.toString()) }

        setResult(Activity.RESULT_OK, data)
        finish()
    }

    override fun avUnrecoverableError(errorCode: IAvFlowDelegate.AvScanError, errorURL: URL?) {
        val data = Intent()
        data.putExtra("errorCode", errorCode.toString())
        errorURL?.let { data.putExtra("errorURL", it.toString()) }
        setResult(Activity.RESULT_FIRST_USER, data)
        finish()
    }

    override fun onBackPressed() {
        setResult(Activity.RESULT_CANCELED)
        finish()
    }

}
