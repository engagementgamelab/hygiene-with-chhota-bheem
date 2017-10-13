﻿/*

Hygiene With Chhota Bheem
Created by Engagement Lab @ Emerson College, 2017

==============
	ArchetypeFollow.cs
	Archetype class for objects that follow players.
	https://github.com/engagementgamelab/hygiene-with-chhota-bheem/blob/master/Assets/Scripts/ArchetypeMove.cs

	Created by Johnny Richardson, Erica Salling.
==============

*/

using System.Collections;
using System.Collections.Generic;
using System.Linq;
using DefaultNamespace;
using JetBrains.Annotations;
using UnityEngine;
using UnityEngine.UI;
#if UNITY_EDITOR
using UnityEditor;
#endif

public class ArchetypeFollow : MonoBehaviour
{
	public float speed = 2;
	public float time = 2;
	public bool chase;

	private GameObject player;
	
	private Vector3 playerPos;
	private Vector3 thisPos;

	private Vector3 _velocity;

	public void Awake() {

		player = GameObject.FindWithTag("Player");
		
	}
	
	public void Update () {

		if (chase) {

			time -= Time.deltaTime;
			if ( time < 0 )
			{
			      chase = false;
			} else {
					// Chase the Player immediately
				  playerPos = player.transform.position;
				  thisPos = gameObject.transform.position;
	
				  gameObject.transform.position = Vector3.SmoothDamp(thisPos, playerPos, ref _velocity, speed);
				
			}
			
		} else {
			// No chasing
		}

	}

}