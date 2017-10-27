﻿using UnityEngine;
using System.Collections;
using System.Collections.Generic;
using UnityEngine.Analytics;
using System.Linq;
using JetBrains.Annotations;

public class AppManager : MonoBehaviour
{

	private float deltaTime;
	private bool touching = false;
	private bool paused = false;

	void Update()
	{
		#if UNITY_ANDROID && !UNITY_EDITOR
		if(Input.touches.Length == 0) 
			touching = true;
		else
			touching = false;
	
		if (!touching && !paused)
		{
			StartCoroutine(Pause());
		}
		#endif
		
	}

	private void Awake()
	{
		StartCoroutine(LocationTest());
		
	}

	public void PauseUI()
	{
		StartCoroutine(UnPause());
	}
	
	IEnumerator Pause()
	{
		paused = true;
		GameConfig.GameSpeedModifier = 0;
		GUIManager.Instance.ShowPause();
		yield return new WaitForSeconds(1);
	}

	IEnumerator UnPause()
	{
		GUIManager.Instance.HidePause();
		yield return new WaitForSeconds(1);
		GameConfig.GameSpeedModifier = 15;
		paused = false;
	}

	IEnumerator LocationTest()
    {
        // First, check if user has location service enabled
        if (!Input.location.isEnabledByUser)
            yield break;

        // Start service before querying location
        Input.location.Start();

        // Wait until service initializes
        int maxWait = 20;
        while (Input.location.status == LocationServiceStatus.Initializing && maxWait > 0)
        {
            yield return new WaitForSeconds(1);
            maxWait--;
        }

        // Service didn't initialize in 20 seconds
        if (maxWait < 1)
        {
            print("Timed out");
            yield break;
        }

        // Connection has failed
        if (Input.location.status == LocationServiceStatus.Failed)
        {
            print("Unable to determine device location");
            yield break;
        }
        else
        {
        	var time = Input.location.lastData.timestamp;

			Analytics.CustomEvent("gameStart", new Dictionary<string, object>
			{
			   { "latitude", Input.location.lastData.latitude },
			   { "longitude", Input.location.lastData.longitude }, 
			   { "time", time }
			});
            // Access granted and location value could be retrieved
            print("Location: " + Input.location.lastData.latitude + " " + Input.location.lastData.longitude + " " + Input.location.lastData.altitude + " " + Input.location.lastData.horizontalAccuracy + " " + Input.location.lastData.timestamp);
        }

        // Stop service if there is no need to query location updates continuously
        Input.location.Stop();
    }

    public void LoadLevel(string level) {

    	if (level == "next")
	    {
		    var next = Application.loadedLevel + 1;
		    UnityEngine.SceneManagement.SceneManager.LoadScene(next);
	    } else if (!System.String.IsNullOrEmpty(level)) 
		    UnityEngine.SceneManagement.SceneManager.LoadScene(level);
	    else 
    		UnityEngine.SceneManagement.SceneManager.LoadScene(Application.loadedLevel);
    		

    }

}